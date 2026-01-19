'use client';

import { Dialog } from '@mui/material';
import { useState } from 'react';
import { AuthMode } from '../../app/types/auth.types';
import { useIsMobile } from '../../hooks/useIsMobile';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';
import styles from './authDialog.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthDialog({ open, onClose }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>(AuthMode.SignIn);
  const isMobile = useIsMobile();
  const {user , logout} = useAuth();
  const dialog = useTranslation('auth.dialog');

    const handleLogout = async () => {
      await logout();
      onClose();
    };

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

        <div className={styles.contentContainer}>
          {user ? (
            <div className={styles.inputsBox}>
              <div className={styles.subtitleBox}>
                <h2 className={styles.subtitleTitle}>{dialog.hi} {user.firstName}</h2>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className={`${styles.submitButton} ${styles.active}`}
              >
                {dialog.logout}
              </button>
            </div>
          ) : 
          mode === AuthMode.SignIn ? (
            <SignInForm
              onSuccess={onClose}
              onSwitchToSignUp={() => setMode(AuthMode.SignUp)}
            />
          ) : (
            <SignUpForm
              onSuccess={onClose}
              onSwitchToSignIn={() => setMode(AuthMode.SignIn)}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
}
