import { Request, Response, NextFunction } from "express";

interface RequestWithAuthUser extends Request {
    authUser: number
}

async function authentication(req, res: Response, next: NextFunction) {
    try {
        const token = req.headers['x-auth-token'];

        //   const verified = verifyAuthToken(token);
        const verified = false;

        if (!verified) return res.status(401).json('Authentication required');

        const { userId } = verified;

        req.authUser = userId;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export default authentication;