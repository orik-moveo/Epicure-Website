import { Dish } from "./dishes.types";

export type DialogType = 'auth' | 'dish' | null;

export interface DialogContextType {
  // Auth Dialog
  isAuthDialogOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;

  // Dish Dialog
  isDishDialogOpen: boolean;
  selectedDish: Dish | null;
  openDishDialog: (dish: Dish) => void;
  closeDishDialog: () => void;
}
