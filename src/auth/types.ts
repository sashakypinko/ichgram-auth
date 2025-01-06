import {Scope} from 'light-kite';

export interface AuthTokenPayload {
  userId: string,
  userScopes: Scope[],
}