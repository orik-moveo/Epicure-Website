import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { AuthMode } from '../../app/types/auth.types';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthDialog({ open, onClose }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>(AuthMode.SignIn);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{mode === AuthMode.SignIn ? 'Sign In' : 'Sign Up'}</DialogTitle>

      <DialogContent>
        {mode === 'signin' ? (
          <>
            <p>Sign in form goes here</p>
            <button onClick={() => setMode(AuthMode.SignUp)}>Go to Sign up</button>
          </>
        ) : (
          <>
            <p>Sign up form goes here</p>
            <button onClick={() => setMode(AuthMode.SignIn)}>Go to Sign in</button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
