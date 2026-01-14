import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { AuthMode } from '../../app/types/auth.types';
import { useTranslation } from '../../hooks/useTranslation';
import SignInForm from './signInForm';
import SignUpForm from './signUpForm';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthDialog({ open, onClose }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>(AuthMode.SignIn);
  const dialog = useTranslation('auth.dialog');

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {mode === AuthMode.SignIn ? dialog.signIn : dialog.signUp}
      </DialogTitle>

      <DialogContent>
        {mode === AuthMode.SignIn ? (
          <>
            <SignInForm onSuccess={onClose} />
            <button onClick={() => setMode(AuthMode.SignUp)}>
              {dialog.goToSignUp}
            </button>
          </>
        ) : (
          <>
            <SignUpForm onSuccess={onClose} />
            <button onClick={() => setMode(AuthMode.SignIn)}>
              {dialog.goToSignIn}
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
