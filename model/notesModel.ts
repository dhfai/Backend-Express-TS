import { Notes } from "@prisma/client";

export type NotesResponse = {
    id: string;
    title     :String
    content   :String
    userId      :String
}

export type CreateNotesRequest = {
    title     : String
    content   : String
}


export type UpdateNotesRequest = {
    id        : String;
    title     : String;
    content   : String;
}

export type SearchNotesRequest = {
    title     ?: String;
    content   ?: String;
    page       : number;
    size       : number;
}


export function toNotesResponse(notes: Notes): NotesResponse {
    return {
        id: notes.id,
        title: notes.title,
        content: notes.content,
        userId: notes.userId
    }
}