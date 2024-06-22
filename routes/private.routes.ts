import express from 'express';
import { AuthMiddleware } from '../middleware/auth-middleware';
import { AuthController } from '../controller/AuthController';
import { NotesController } from '../controller/NotesController';

export const privateRouter = express.Router();
privateRouter.use(AuthMiddleware);

privateRouter.get("/api/users/current", AuthController.get);
privateRouter.patch("/api/users/", AuthController.update);
privateRouter.delete("/api/users/", AuthController.logout);


// Note routes
privateRouter.post("/api/create-note/", NotesController.createNote);
privateRouter.get("/api/note/:noteId", NotesController.getNote);
privateRouter.put("/api/note/:noteId", NotesController.updateNote);
privateRouter.delete("/api/note/:noteId", NotesController.deleteNote);
privateRouter.delete("/api/note/:noteId", NotesController.deleteNote);
privateRouter.get("/api/note/", NotesController.searchNotes);