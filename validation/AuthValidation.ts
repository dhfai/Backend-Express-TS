import { ZodType, z } from 'zod';

export class AuthValidation {
    static readonly REGISTER: ZodType = z.object({
        email: z.string().email(),
        username: z.string().min(3).max(20),
        password: z.string().min(6).max(20),
    })
    
    static readonly LOGIN: ZodType = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(20),
    })
    
    static readonly FORGET_PASSWORD: ZodType = z.object({
        password: z.string().min(6).max(20),
    })

    static readonly UPDATE: ZodType = z.object({
        firstName: z.string().min(1).max(50).optional(),
        lastName: z.string().min(1).max(50).optional(),
        phone: z.string().min(1).max(20).optional(),
        bio: z.string().min(1).max(255).optional(),
        image: z.string().min(1).max(255).optional(),
    })
}