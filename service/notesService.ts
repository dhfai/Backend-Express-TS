import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/responseError";
import { CreateNotesRequest, NotesResponse, SearchNotesRequest, UpdateNotesRequest, toNotesResponse } from "../model/notesModel";
import { NotesValidation } from "../validation/notesValidation";
import { NoteRefactor } from "../refactor/noteRefactor";
import { PageTable } from "../model/page";

export class NotesServie {

    static async createNote( user: User, request: CreateNotesRequest): Promise<NotesResponse> {
        const createNotes = Validation.validate(NotesValidation.ADD_NOTES, request);
        const record = {
            ...createNotes,
            ...{ userId: user.id }
        }
        const note = await prismaClient.notes.create({
            data: record
        });

        return toNotesResponse(note);
    }

    static async getNote(user: User, id: string): Promise<NotesResponse> {
        const note = await NoteRefactor.checkNoteMustExist(id, user.id);
        return toNotesResponse(note);
    }

    static async updateNote(user: User, request: UpdateNotesRequest): Promise<NotesResponse> {
        const updateNotes = Validation.validate(NotesValidation.UPDATE_NOTES, request);
        await NoteRefactor.checkNoteMustExist(updateNotes.id, user.id);
        const updatedNote = await prismaClient.notes.update({
            where: {
                id: updateNotes.id,
                userId: user.id
            },
            data: updateNotes
        });
        return toNotesResponse(updatedNote);
    }

    static async deleteNote(user: User, id: string): Promise<NotesResponse>{
        await NoteRefactor.checkNoteMustExist(id, user.id);
        const note = await prismaClient.notes.delete({
            where: {
                id: id,
                userId: user.id
            }
        });
        return toNotesResponse(note);
    }


    static async searchNotes(user: User, request: SearchNotesRequest): Promise<PageTable<NotesResponse>> {
        const noteSearch = Validation.validate(NotesValidation.SEARCH_NOTES, request);
        const skip = (noteSearch.page - 1) * noteSearch.size;
        const filters: any[] = [];
        if (noteSearch.title) {
            filters.push({
                title: {
                    contains: noteSearch.title
                }
            });
        }
        if (noteSearch.content) {
            filters.push({
                content: {
                    contains: noteSearch.content
                }
            });
        }

        const notes = await prismaClient.notes.findMany({
            where: {
                userId: user.id,
                AND: filters
            },
            take: noteSearch.size,
            skip: skip
        });

        const total = await prismaClient.notes.count({
            where: {
                userId: user.id,
                AND: filters
            }
        });

        return {
            data: notes.map(notes => toNotesResponse(notes)),
            pagging: {
                current_page: noteSearch.page,
                total_page: Math.ceil(total / noteSearch.size),
                size: noteSearch.size,

            }
        }
    }
}