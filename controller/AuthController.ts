import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/AuthService';
import { AuthLoginRequest, AuthRegisterRequest, AuthUpdateRequest } from '../model/AuthModel';
import { UserRequest } from '../type/UserRequest';

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const registerRequest: AuthRegisterRequest = req.body as AuthRegisterRequest;
            console.log("Data input:", registerRequest);
            const user = await AuthService.register(registerRequest);
            res.status(201).json({
                message: "User has been registered",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginRequest: AuthLoginRequest = req.body as AuthLoginRequest;
            const user = await AuthService.login(loginRequest);
            res.status(201).json({
                message: "User logged in successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }


    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.get(req.user!);
            res.status(201).json({
                message: "User data retrieved successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    
    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: AuthUpdateRequest = req.body as AuthUpdateRequest;
            const user = await AuthService.update(req.user!, request);
            res.status(201).json({
                message: "Change password successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    
    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.logout(req.user!);
            res.status(201).json({
                message: "Logout successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
}