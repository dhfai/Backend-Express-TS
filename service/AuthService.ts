import { prismaClient } from "../application/database";
import { ResponseError } from "../error/responseError";
import { AuthLoginRequest, AuthRegisterRequest, AuthResponse, AuthUpdateRequest, toAuthResponse } from "../model/AuthModel";
import { AuthValidation } from "../validation/AuthValidation";
import { Validation } from "../validation/validation";
import * as bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "@prisma/client";
dotenv.config();


export class AuthService {
    static async register(req: AuthRegisterRequest): Promise<AuthResponse> {
        const registerRequest = Validation.validate(AuthValidation.REGISTER, req);

        const totalUsersWithSameEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email,
            }
        });
        if (totalUsersWithSameEmail != 0) {
            throw new ResponseError(400, 'Email has been used, go to login page');
        }
        const totalUsersWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username,
            }
        });
        if (totalUsersWithSameUsername != 0) {
            throw new ResponseError(400, 'Username has been used, please use another username');
        }
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
        const user = await prismaClient.user.create({
            data: registerRequest
        });

        return toAuthResponse(user);
    };

    static async login(req: AuthLoginRequest): Promise<AuthResponse> {
        const loginRequest = Validation.validate(AuthValidation.LOGIN, req);
        const user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            }
        });

        if (!user) {
            throw new ResponseError(404, 'Email or password is incorrect');
        }

        const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordMatch) {
            throw new ResponseError(400, 'Email or password is incorrect');
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT secret is not defined');
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret as Secret);
        const userWithToken = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: token
            }
        });

        const response = toAuthResponse(userWithToken);
        response.token = userWithToken.token!;

        return response
    }

    static async get(user: User): Promise<AuthResponse> {
        return toAuthResponse(user);
    }

    static async update(user: User, req: AuthUpdateRequest): Promise<AuthResponse> {
        const updateProfile = Validation.validate(AuthValidation.UPDATE, req);

        const userData = {
            firstName: updateProfile.firstName,
            lastName: updateProfile.lastName,
            phone: updateProfile.phone,
            bio: updateProfile.bio,
            image: updateProfile.image
        }

        const updatedUser = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: userData
        });

        return toAuthResponse(updatedUser);
    }

    static async logout(user: User): Promise<AuthResponse> {
        const result = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: null
            }
        });

        return toAuthResponse(result);
    }
}