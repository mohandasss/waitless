import jwt, { type JwtPayload } from "jsonwebtoken";

export const signTokens = (payload: { id: string | number; phone: string }) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as JwtPayload | string;

    if (typeof decoded === "string" || !decoded || typeof decoded !== "object") {
      throw new Error("Invalid token payload");
    }

    const payload = {
      id: decoded.id as string | number,
      phone: decoded.phone as string,
    };
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
