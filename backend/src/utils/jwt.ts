import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signTokens = async (subject: string, method: string) => {
  const accessTokenExpiresIn = process.env.JWT_ACCESS_EXPIRES || '15m';
  const refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES || '7d';

  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets are not configured in environment variables');
  }

  const accessToken = jwt.sign(
    { sub: subject, method } as object,
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: accessTokenExpiresIn }
  );

  const refreshToken = jwt.sign(
    { sub: subject, method } as object,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: refreshTokenExpiresIn }
  );

  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

  const refreshExpiresAt = new Date(Date.now() + parseExpiryToMs(refreshTokenExpiresIn));

  return {
    accessToken,
    refreshToken,
    refreshTokenHash,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
    refreshExpiresAt,
  } as const;
};

export const parseExpiryToMs = (expiry: string) => {
  const m = expiry.match(/^(\d+)(s|m|h|d)?$/);
  if (!m) return 15 * 60 * 1000;
  const value = Number(m[1]);
  const unit = m[2] || 's';
  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return value * 1000;
  }
};
