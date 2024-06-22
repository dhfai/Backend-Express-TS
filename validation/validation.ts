import { ZodType } from "zod"

export class Validation {
    static validate<T>(schema: ZodType, data: T) {
        return schema.parse(data)
    }
}