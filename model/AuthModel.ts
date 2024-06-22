import { User } from "@prisma/client";

export type AuthResponse = {
    id: string;
    email: string;
    username: string;
    password: string;
    token?: string | null;
    firstName?: String | null
    lastName ?: String | null
    phone    ?: String | null
    bio      ?: String | null
    image    ?: String | null

}


export type AuthRegisterRequest = {
    email: string;
    username: string;
    password: string;
}

export type AuthLoginRequest = {
    email: string;
    password: string;
}


export type AuthUpdateRequest = {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    image?: string;
}

export function toAuthResponse(user: User): AuthResponse {
    return {
        id:  user.id,
        email: user.email,
        username: user.username,
        password: user.password,
        token: user.token,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        bio: user.bio,
        image: user.image
    }
}