// User Type
export interface User {
  id: number;
  uuid: string;
  email: string;
  fname: string;
  lname: string;
}

// OAuth Provider Type
export interface OAuthProvider {
  id: number;
  provider_key: string;
}

// Users OAuth Providers Type
export interface UserOAuthProvider {
  id: number;
  user_id: number;
  auth_method_id: number;
  access_token: string;
  refresh_token: string | null;
  access_token_expiry: Date | null;
}

// Refresh Token Type
export interface RefreshToken {
  id: number;
  user_id: number;
  created_at: Date;
  revoked_at: Date | null;
  revoked_user_id: number | null;
}

// Local Authentication Type
export interface LocalAuth {
  id: number;
  user_id: number | null;
  password_hash: string | null;
}
