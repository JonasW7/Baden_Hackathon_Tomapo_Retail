export type User = {
  _id: string;
  email: string;
  name: string;
  role: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  user: User;
} & AuthTokens;