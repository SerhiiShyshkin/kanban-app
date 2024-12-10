'use server';

import { Column } from '@/app/types';
import prisma from '../db';
import { revalidatePath } from 'next/cache';
import { getRandomColor } from '@/lib/helpers/getRandomColor';
import { redirect } from 'next/navigation';

const updateColumnColor = async (columnId: string, color: string) => {
  try {
    await prisma.column.update({
      where: {
        id: columnId,
      },
      data: {
        color,
      },
    });

    revalidatePath(`/`);
  } catch (error) {
    console.error('Error updating column color:', error);
    throw new Error('Failed to update column color');
  }
};

const getBoards = async () => {
  try {
    return await prisma.board.findMany({
      select: {
        id: true,
        title: true,
        columns: {
          select: {
            id: true,
            title: true,
            color: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error updating board:', error);
    throw new Error('Failed to get boards');
  }
};

const getBoardById = async (boardId: string) => {
  try {
    return await prisma.board.findUnique({
      where: { id: boardId },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching board:', error);
    throw new Error(`Failed to get board ${boardId}`);
  }
};

const createBoard = async (title: string, columns: Column[]) => {
  try {
    revalidatePath(`/`);
    await prisma.board.create({
      data: {
        title,
        columns: {
          create: columns.map((column) => ({
            title: column.title,
            //color: column.color,
            color: getRandomColor(),
          })),
        },
      },
    });
  } catch (error) {
    console.error('Error updating Board:', error);
    throw new Error('Failed to update Board');
  }
};

const updateBoard = async (id: string, title: string, columns: Column[]) => {
  try {
    revalidatePath(`/`);
    await prisma.board.update({
      where: { id },
      data: {
        title,
        columns: {
          // Удаление колонок, которых нет в переданных данных
          deleteMany: {
            NOT: columns.map((column) => ({ id: column.id })), // Удаляем только отсутствующие
          },
          // Обновление или создание колонок
          upsert: columns.map((column) => ({
            where: { id: column.id ?? '' }, // Пытаемся найти по ID
            update: {
              title: column.title,
              color: column.color, // Обновляем существующую колонку
            },
            create: {
              title: column.title,
              color: getRandomColor(), // Создаём новую колонку
            },
          })),
        },
      },
      select: {
        id: true,
        title: true,
        columns: {
          select: {
            id: true,
            title: true,
            color: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error updating Board:', error);
    throw new Error('Failed to update Board');
  }
};

const deleteBoardById = async (boardId: string) => {
  try {
    revalidatePath('/');

    return await prisma.board.delete({
      where: { id: boardId },
    });
  } catch (error) {
    console.error('Error deleting Board:', error);
    throw new Error('Failed to delete Board');
  }
};

export {
  createBoard,
  updateBoard,
  updateColumnColor,
  getBoardById,
  getBoards,
  deleteBoardById,
};
