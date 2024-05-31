export interface UserPayload {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
    exp: number;
    iss: string;
    aud: string;
  }

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}