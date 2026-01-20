'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { AuthContextType, AuthUser, LoginPayload, RegisterPayload } from '../app/types/auth.types';
import { getMe, login, logout, registerUser } from '@/lib/api';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     loadCurrentUser();
   }, []);

   const loadCurrentUser = async () => {
     try {
       setIsLoading(true);
       const response = await getMe();
       setUser(response.user);
     } catch (error) {
       setUser(null);
     } finally {
       setIsLoading(false);
     }
   };

   const handleLogin = async (payload: LoginPayload) => {
     await login(payload);
     await loadCurrentUser();
   };

   const handleRegister = async (payload: RegisterPayload) => {
     await registerUser(payload);
     await loadCurrentUser();
   };

   const handleLogout = async () => {
     await logout();
     setUser(null);
   };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}