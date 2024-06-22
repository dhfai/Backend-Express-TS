import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/responseError";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        res.status(400).json({
            message: `Validation error: ${JSON.stringify(error)}`
        });
    } else if (error instanceof ResponseError) {
        res.status(error.status).json({
            message: error.message
        });
    } else {
        res.status(500).json({
            message: `Internal server error: ${error.message}`
        });
    }
}