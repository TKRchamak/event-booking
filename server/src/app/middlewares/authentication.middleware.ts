import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../utils/authentication";

// interface RequestWithAuthUser extends Request {
//     authUser: number
// }

async function authentication(req: Request | any, res: Response, next: NextFunction) {
    try {
        // const token = req.cookie?.jwt;
        const token = req.headers['x-auth-token'];
        const verified = verifyAuthToken(token);
        if (!verified) return res.status(401).json('Authentication required');
        req.authUser = verified;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export default authentication;