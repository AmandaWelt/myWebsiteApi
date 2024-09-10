import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import noteService from '../services/note.service';
import { Request, Response } from 'express';
import { Note } from '@prisma/client';

/**
 * Get all notes
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
const getNotes = catchAsync(async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await noteService.queryNotes();
    res.status(httpStatus.OK).send({ message: 'Notes fetched successfully', notes });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Failed to fetch notes' });
  }
});

/**
 * Create a note
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
const createNote = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { title, content } = req.body;

  const note: Note = await noteService.createNote({
    title,
    content
  });
  res.status(httpStatus.CREATED).send({ message: 'Note created successfully', note });
});

export default {
  getNotes,
  createNote
};
