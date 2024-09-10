import express from 'express';
import noteController from '../../controllers/note.controller';

const router = express.Router();

router.route('/').get(noteController.getNotes).post(noteController.createNote);

export default router;
