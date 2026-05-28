import { hashToken } from "../utils/miscHelpers.js";
import { prisma } from "../utils/prisma.js";




export const saveRefreshTokenRepository = async (
  phone: string,
  token: string,
  expiresAt: Date,
) => {
  const tokenHash = hashToken(token);

  return prisma.refreshToken.create({
    data: {
      phone,
      tokenHash,
      expiresAt,
    },
  });
};

export const findRefreshTokenRepository = async (token: string, phone?: string) => {
  const tokenHash = hashToken(token);
  const where: any = {
    tokenHash,
    revoked: false,
    expiresAt: {
      gt: new Date(),
    },
  };

  if (phone) where.phone = phone;

  return prisma.refreshToken.findFirst({ where });
};

export const revokeRefreshTokenRepository = async (id: number) => {
  return prisma.refreshToken.update({
    where: { id },
    data: { revoked: true },
  });
};

export default saveRefreshTokenRepository;
