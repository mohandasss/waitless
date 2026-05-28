import type { Response } from 'express';

const getCookieBaseOptions = (maxAgeMs: number) => {
  const frontendUrl = process.env.FRONTEND_URL ?? '';
  const secure =
    process.env.NODE_ENV === 'production' || frontendUrl.startsWith('https');

  return {
    httpOnly: true,
    secure,
    sameSite: 'lax' as const,
    maxAge: maxAgeMs,
    path: '/',
  };
};

export const setAccessTokenCookie = (
  res: Response,
  token: string,
  maxAgeMs: number
) => {
  res.cookie('accessToken', token, getCookieBaseOptions(maxAgeMs));
};

export const setRefreshTokenCookie = (
  res: Response,
  token: string,
  maxAgeMs: number
) => {
  res.cookie('refreshToken', token, getCookieBaseOptions(maxAgeMs));
};

export default setAccessTokenCookie;
