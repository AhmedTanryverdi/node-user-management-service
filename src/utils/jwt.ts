import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = 'super-secret-key'; //process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '1h'; //process.env.JWT_EXPIRES_IN || ;

export const generateToken = (payload: object): string => {

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};