
export enum AuthMode {
  SignIn = 'signin',
  SignUp = 'signup',
}

interface BaseUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthUser extends BaseUser {
  id: string;
}

export interface RegisterPayload extends BaseUser {
  password: string;
}

export interface LoginPayload extends Pick<BaseUser, 'email'> {
  password: string;
}
export interface AuthResponse {
  token?: string;
  user: AuthUser;
}
