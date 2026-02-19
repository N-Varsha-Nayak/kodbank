import jwt from "jsonwebtoken";
import { getJwtSecret } from "./env";
import { JwtPayload } from "jsonwebtoken";

export type KodRole = "Customer" | "manager" | "admin";

type TokenPayload = JwtPayload & {
  role: KodRole;
};

export function signUserToken(username: string, role: KodRole) {
  const secret = getJwtSecret();
  const expiresIn = "1h";
  const token = jwt.sign({ role }, secret, {
    subject: username,
    expiresIn,
    algorithm: "HS256",
  });

  const decoded = jwt.decode(token) as { exp?: number } | null;
  if (!decoded?.exp) {
    throw new Error("Token expiry missing");
  }

  return {
    token,
    expiryDate: new Date(decoded.exp * 1000),
  };
}

export function verifyUserToken(token: string) {
  const secret = getJwtSecret();
  const payload = jwt.verify(token, secret, {
    algorithms: ["HS256"],
  }) as TokenPayload;

  return {
    username: payload.sub as string,
    role: payload.role,
  };
}
