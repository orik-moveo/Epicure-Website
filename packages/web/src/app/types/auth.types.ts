
export enum AuthMode {
  SignIn = 'signin',
  SignUp = 'signup',
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface AuthResponse {
  token: string;
  user: AuthUser;
}
