import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = "default_secret";
const secret = new TextEncoder().encode(JWT_SECRET);
export const signToken = async (payload: { [key: string]: unknown }) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);
};
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
};
