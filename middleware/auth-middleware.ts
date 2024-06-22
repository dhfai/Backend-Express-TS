import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/UserRequest";

export const AuthMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        })

        if (user) {
            req.user = user;
            next();
            return;
        }
    }

    res.status(401).json({
        message: 'Unauthorized'
    }).end();
}