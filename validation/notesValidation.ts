import { ZodType, z } from "zod";

export class NotesValidation {
    static readonly ADD_NOTES: ZodType = z.object({
        title: z.string().min(1).max(50),
        content: z.string().min(1).max(255),
    })
    
    static readonly UPDATE_NOTES: ZodType = z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(50),
        content: z.string().min(1).max(255),
    })
    
    static readonly SEARCH_NOTES: ZodType = z.object({
        title: z.string().min(1).max(50).optional(),
        content: z.string().min(1).max(255).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })
}