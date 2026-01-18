'use client';

import { createContext, useState, ReactNode } from 'react';
import { DialogContextType } from '../app/types/dialog.types';
import { Dish } from '../app/types/dishes.types';

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isDishDialogOpen, setIsDishDialogOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const openAuthDialog = () => setIsAuthDialogOpen(true);
  const closeAuthDialog = () => setIsAuthDialogOpen(false);

  const openDishDialog = (dish: Dish) => {
    setSelectedDish(dish);
    setIsDishDialogOpen(true);
  };

  const closeDishDialog = () => {
    setIsDishDialogOpen(false);
    setSelectedDish(null);
  };

  return (
    <DialogContext.Provider
      value={{
        isAuthDialogOpen,
        openAuthDialog,
        closeAuthDialog,
        isDishDialogOpen,
        selectedDish,
        openDishDialog,
        closeDishDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export { DialogContext };
