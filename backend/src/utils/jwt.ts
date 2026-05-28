import jwt from "jsonwebtoken";

export const signTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (
  token: string,
  type: "access" | "refresh"
) => {
  try {
    const secret = process.env.JWT_SECRET!;

    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};