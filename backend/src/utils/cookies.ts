import type { Response } from 'express';

export const setRefreshTokenCookie = (
  res: Response,
  token: string,
  maxAgeMs: number
) => {
  const frontendUrl = process.env.FRONTEND_URL ?? '';
  const secure =
    process.env.NODE_ENV === 'production' || frontendUrl.startsWith('https');

  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    maxAge: maxAgeMs,
    path: '/',
  });
};

export default setRefreshTokenCookie;
