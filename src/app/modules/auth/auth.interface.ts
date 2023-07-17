export type IAuth = {
  id: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPassword: boolean;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
