// packages/web/src/lib/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddToCartDto } from '../../../../shared/dto/cart/addToCart.dto';
import { CartItemResponseDto } from '../../../../shared/dto/cart/cartItemResponse.dto';
import { CartItemDishDto } from '../../../../shared/dto/cart/cartItemDish.dto';
import {normalizeArray,itemsMatch,} from '../../../../shared/utils/cart.utils';
import {addToCart,updateCartItem,getCart,mergeCart,} from '../api';

interface LocalCartItem extends AddToCartDto {
  tempId: string;
  dish: CartItemDishDto | null;
}

interface CartStore {
  // State
  items: CartItemResponseDto[];
  localItems: LocalCartItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  addToCart: (
    dto: AddToCartDto,
    isLoggedIn: boolean,
    dish?: CartItemDishDto | null
  ) => Promise<void>;

  updateQuantity: (
    id: string,
    quantity: number,
    isLoggedIn: boolean
  ) => Promise<void>;

  removeFromCart: (id: string, isLoggedIn: boolean) => Promise<void>;
  loadUserCart: () => Promise<void>;
  mergeAfterLogin: () => Promise<void>;
  clearError: () => void;

  // Computed values
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      localItems: [],
      isLoading: false,
      error: null,

      addToCart: async (dto, isLoggedIn, dish = null) => {
        set({ isLoading: true, error: null });

        try {
          const { localItems, items } = get();

          // ---------------------------
          //  GUEST MODE (Not logged in)
          // ---------------------------
          if (!isLoggedIn) {
            // Normalize values BEFORE comparing & BEFORE saving!
            const normalizedDto = {
              dishId: dto.dishId,
              sides: normalizeArray(dto.sides),
              changes: normalizeArray(dto.changes),
              quantity: dto.quantity,
            };

            // Look for duplicate item (same dish + same sides/changes)
            const existingLocal = localItems.find((li) =>
              itemsMatch(normalizedDto, {
                dishId: li.dishId,
                sides: normalizeArray(li.sides),
                changes: normalizeArray(li.changes),
              })
            );

            if (existingLocal) {
              // Merge quantity (item already exists)
              set({
                localItems: localItems.map((li) =>
                  li.tempId === existingLocal.tempId
                    ? {
                        ...li,
                        quantity: li.quantity + dto.quantity,
                        // keep dish or apply new dish if given
                        dish: dish || li.dish,
                      }
                    : li
                ),
              });
            } else {
              // SAVE NORMALIZED VALUES
              set({
                localItems: [
                  ...localItems,
                  {
                    ...dto,
                    sides: normalizedDto.sides,
                    changes: normalizedDto.changes,
                    tempId: crypto.randomUUID(),
                    dish: dish || null,
                  },
                ],
              });
            }

            return;
          }

          // ---------------------------
          //  LOGGED IN MODE (Server)
          // ---------------------------
          const newItem = await addToCart(dto);

          // If backend merged with existing item → same ID returned
          const existingIndex = items.findIndex((i) => i.id === newItem.id);

          if (existingIndex >= 0) {
            set({
              items: items.map((it, idx) =>
                idx === existingIndex ? newItem : it
              ),
            });
          } else {
            set({ items: [...items, newItem] });
          }
        } catch (err) {
          const error =
            err instanceof Error ? err.message : 'Failed to add to cart';
          set({ error });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (id, quantity, isLoggedIn) => {
        set({ isLoading: true, error: null });
        try {
          const { localItems, items } = get();

          if (!isLoggedIn) {
            if (quantity === 0) {
              set({ localItems: localItems.filter((i) => i.tempId !== id) });
              return;
            }

            set({
              localItems: localItems.map((i) =>
                i.tempId === id ? { ...i, quantity } : i
              ),
            });
            return;
          }

          // Logged in - API call
          const updated = await updateCartItem(id, quantity);

          set({
            items: updated
              ? items.map((it) => (it.id === id ? updated : it))
              : items.filter((it) => it.id !== id),
          });
        } catch (err) {
          const error =
            err instanceof Error ? err.message : 'Failed to update cart item';
          set({ error });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      removeFromCart: async (id, isLoggedIn) => {
        set({ isLoading: true, error: null });
        try {
          const { localItems, items } = get();

          if (!isLoggedIn) {
            set({ localItems: localItems.filter((i) => i.tempId !== id) });
            return;
          }

          await updateCartItem(id, 0);
          set({ items: items.filter((i) => i.id !== id) });
        } catch (err) {
          const error =
            err instanceof Error ? err.message : 'Failed to remove cart item';
          set({ error });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      loadUserCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const items = await getCart();
          set({ items });
        } catch (err) {
          const error =
            err instanceof Error ? err.message : 'Failed to load cart';
          set({ error });
          // Don't throw - allow user to continue with empty cart
        } finally {
          set({ isLoading: false });
        }
      },

      mergeAfterLogin: async () => {
        set({ isLoading: true, error: null });
        try {
          const local = get().localItems;

          if (local.length === 0) {
            await get().loadUserCart();
            return;
          }

          const dtoItems = local.map(({ tempId, dish, ...rest }) => rest);
          const merged = await mergeCart(dtoItems);
          set({ items: merged, localItems: [] });
        } catch (err) {
          const error =
            err instanceof Error ? err.message : 'Failed to merge cart';
          set({ error });
          // Still try to load user cart as fallback
          await get().loadUserCart();
        } finally {
          set({ isLoading: false });
        }
      },

      clearError: () => set({ error: null }),

      totalItems: () => {
        const { items, localItems } = get();
        return (
          items.reduce((s, i) => s + i.quantity, 0) +
          localItems.reduce((s, i) => s + i.quantity, 0)
        );
      },

      totalPrice: () => {
        const { items, localItems } = get();
        return (
          items.reduce((s, i) => s + (i.dish?.price ?? 0) * i.quantity, 0) +
          localItems.reduce((s, i) => s + (i.dish?.price ?? 0) * i.quantity, 0)
        );
      },
    }),

    {
      name: 'cart-storage',
      partialize: (state) => ({ localItems: state.localItems }),
    }
  )
);
