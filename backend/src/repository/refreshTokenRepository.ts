import { hashToken, generateId } from "../utils/miscHelpers.js";
import { prisma } from "../utils/prisma.js";




export const saveRefreshTokenRepository = async (
  phone: string,
  token: string,
  expiresAt: Date,
) => {
  const tokenHash = hashToken(token);

  return prisma.$transaction(async (tx) => {
    await tx.refreshToken.updateMany({
      where: {
        phone,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
      data: { revoked: true },
    });

    return tx.refreshToken.create({
      data: {
        id: String(generateId()),
        phone,
        tokenHash,
        expiresAt,
      },
    });
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
  console.log("Finding refresh token with hash:", tokenHash, "and phone:", phone);

  if (phone) where.phone = phone;

  return prisma.refreshToken.findFirst({ where });
};

export const revokeRefreshTokenRepository = async (id: string) => {
  return prisma.refreshToken.update({
    where: { id },
    data: { revoked: true },
  });
};

export default saveRefreshTokenRepository;
