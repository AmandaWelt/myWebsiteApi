import { Note, Prisma } from '@prisma/client';
import prisma from '../client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { notDeepEqual } from 'assert';

/**
 * Create a note
 * @param {Object} noteBody - Contains title, content, and userId
 * @returns {Promise<Note>}
 */
const createNote = async (noteBody: { title: string; content: string }): Promise<Note> => {
  return prisma.note.create({
    data: noteBody
  });
};

/**
 * Query for notes
 * @returns {Promise<Note[]>}
 */
const queryNotes = async (): Promise<Note[]> => {
  return prisma.note.findMany();
};

/**
 * Get note by id
 * @param {number} id
 * @returns {Promise<Note | null>}
 */
const getNoteById = async (id: number): Promise<Note | null> => {
  return prisma.note.findUnique({
    where: { id }
  });
};

/**
 * Update note by id
 * @param {number} noteId
 * @param {Object} updateBody - Contains fields to update
 * @returns {Promise<Note | null>}
 */
const updateNoteById = async (
  noteId: number,
  updateBody: Prisma.NoteUpdateInput
): Promise<Note | null> => {
  const note = await getNoteById(noteId);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  return prisma.note.update({
    where: { id: noteId },
    data: updateBody
  });
};

/**
 * Delete note by id
 * @param {number} noteId
 * @returns {Promise<Note>}
 */
const deleteNoteById = async (noteId: number): Promise<Note> => {
  const note = await getNoteById(noteId);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  await prisma.note.delete({ where: { id: noteId } });
  return note;
};

export default {
  createNote,
  queryNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById
};
