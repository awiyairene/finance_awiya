export interface AdditionalUserInfo {
  isNewUser: boolean;
  providerId: string;
  profile: Record<any, any>;
}

export interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
}

export interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

export interface AuthResponse {
  operationType: string;
  credential: any | null;
  additionalUserInfo: AdditionalUserInfo;
  user: User;
}
