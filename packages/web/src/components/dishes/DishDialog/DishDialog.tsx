'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslation';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { Dish } from '../../../app/types/dishes.types';
import {
  formatIngredients,
  formatPrice,
  getDietIconPath,
} from '../dishes.utils';
import styles from './DishDialog.module.scss';

interface DishDialogProps {
  dish: Dish | null;
  open: boolean;
  onClose: () => void;
}

export default function DishDialog({ dish, open, onClose }: DishDialogProps) {
  const translations = useTranslation('dishDialog');
  const isMobile = useIsMobile();
  const [selectedSide, setSelectedSide] = useState<string>('');
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (dish) {
      setSelectedSide('');
      setSelectedChanges([]);
      setQuantity(1);
    }
  }, [dish?.documentId]);

  if (!dish) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={isMobile === true}
      ></Dialog>
    );
  }

  const dishImage = dish.image?.[0]?.url || '';
  const ingredientsText = formatIngredients(dish.ingredients);
  const priceText = formatPrice(dish.price);
  const dietIconPath = getDietIconPath(dish.dietType);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile === true}
      PaperProps={{ className: styles.dialogPaper }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'var(--c-backdrop)',
        },
        '& .MuiDialog-paper': {
          overflow: isMobile ? 'hidden' : 'visible',
        },
        '& .MuiDialog-container': {
          paddingTop: isMobile ? 0 : '30px',
          overflow: isMobile ? 'hidden' : 'visible',
        },
      }}
    >
      {!isMobile && (
        <div className={styles.closeButtonRow}>
          <button className={styles.closeButton} onClick={onClose}>
            <img
              src="/assets/icons/x-white.svg"
              alt="Close"
              className={styles.closeIconDesktop}
            />
          </button>
        </div>
      )}

      <div className={styles.dialogContent}>
        {isMobile && (
          <div className={styles.closeButtonRow}>
            <button className={styles.closeButton} onClick={onClose}>
              <img
                src="/assets/icons/x.svg"
                alt="Close"
                className={styles.closeIconMobile}
              />
            </button>
          </div>
        )}

        {/* Dish Image */}
        {dishImage && (
          <div className={styles.imageContainer}>
            <img src={dishImage} alt={dish.name} className={styles.image} />
          </div>
        )}

        <div className={styles.contentContainer}>
          <h2 className={styles.title}>{dish.name}</h2>
          {ingredientsText && (
            <p className={styles.ingredients}>{ingredientsText}</p>
          )}
          {dietIconPath && (
            <div className={styles.dietIconContainer}>
              <img
                src={dietIconPath}
                alt={dish.dietType || 'Diet type'}
                className={styles.dietIcon}
              />
            </div>
          )}
          <div className={styles.priceContainer}>
            <div className={styles.priceLine}></div>
            <img
              src="/assets/icons/shekel.svg"
              alt="Shekel"
              className={styles.shekelIcon}
            />
            <span className={styles.price}>{priceText}</span>
            <div className={styles.priceLine}></div>
          </div>

          {dish.sides && dish.sides.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                {translations.chooseASide}
              </h3>
              <div className={styles.optionsList}>
                {dish.sides.map((side, index) => (
                  <label key={index} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="side"
                      value={side.label}
                      checked={selectedSide === side.label}
                      onChange={() => setSelectedSide(side.label)}
                      className={styles.radioInput}
                    />
                    <span className={styles.optionLabel}>{side.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {dish.changes && dish.changes.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{translations.changes}</h3>
              <div className={styles.optionsList}>
                {dish.changes.map((change, index) => (
                  <label key={index} className={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={selectedChanges.includes(change.label)}
                      onChange={() =>
                        setSelectedChanges((prev) =>
                          prev.includes(change.label)
                            ? prev.filter((c) => c !== change.label)
                            : [...prev, change.label]
                        )
                      }
                      className={styles.checkboxInput}
                    />
                    <span className={styles.optionLabel}>{change.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{translations.quantity}</h3>
            <div className={styles.quantityContainer}>
              <button
                type="button"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className={styles.quantityButton}
              >
                -
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              console.log('added to bag')
            }
            className={styles.addToBagButton}
          >
            <img
              src="/assets/icons/addBagBlack.svg"
              alt="Add to bag"
              className={styles.addToBagIcon}
            />
          </button>
        </div>
      </div>
    </Dialog>
  );
}
