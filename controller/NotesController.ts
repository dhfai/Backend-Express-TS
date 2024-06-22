import { Request,Response,NextFunction } from "express";
import { UserRequest } from "../type/UserRequest";
import { NotesServie } from "../service/notesService";
import { CreateNotesRequest, SearchNotesRequest, UpdateNotesRequest } from "../model/notesModel";

export class NotesController {
    static async createNote(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateNotesRequest = req.body as CreateNotesRequest;
            const response = await NotesServie.createNote(req.user!, request);
            res.status(200).json({
                message: "Add new note successfully",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
    
    static async getNote(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.noteId;
            const response = await NotesServie.getNote(req.user!, id);
            res.status(200).json({
                message: "Note retrieved successfully",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateNote(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateNotesRequest = req.body as UpdateNotesRequest;
            request.id = req.params.noteId;
            const response = await NotesServie.updateNote(req.user!, request);
            res.status(200).json({
                message: "Update note successfully",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteNote(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const id = req.params.noteId;
            const response = await NotesServie.deleteNote(req.user!, id);
            res.status(200).json({
                message: "Delete note successfully",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async searchNotes(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchNotesRequest = {
                title: req.query.title as string,
                content: req.query.content as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await NotesServie.searchNotes(req.user!, request);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}