import jwt from "jsonwebtoken"
import configData from "../../config";


const { JWT_KEY } = configData;

export function getAuthToken(userId, expiresIn = '24h') {
    return jwt.sign({ userId }, JWT_KEY, {
        expiresIn,
    });
}

export function getPermanentAuthToken(userId) {
    return jwt.sign({ userId }, JWT_KEY);
}

export function verifyAuthToken(token) {
    return jwt.verify(token, JWT_KEY);
}