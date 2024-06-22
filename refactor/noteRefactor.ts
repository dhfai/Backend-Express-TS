import { Response, NextFunction } from "express";
import { UserRequest } from "../type/UserRequest";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/responseError";

export class NoteRefactor {
    static async checkNoteMustExist(id: string, userId: string) {
        const note = await prismaClient.notes.findUnique({
            where: {
                id: id,
                userId: userId
            }
        });
        if (!note) {
            throw new ResponseError(404, "Note not found");
        }
        return note;
    }
}