import Jwt  from "jsonwebtoken";
import crypto from "crypto"
export const createJWT = (email, userId, duration) => {
    const payload = {
       email,
       userId,
       duration
    };
    return Jwt.sign(payload, "process.env.TOKEN_SECRET", {
      expiresIn: duration,
    });
 };

export const generateVerificationToken = () => {
   const buffer = crypto.randomBytes(20);
   return buffer.toString('hex');
 };