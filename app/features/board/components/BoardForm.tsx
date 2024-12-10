'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { z } from 'zod';
import { createBoard, updateBoard } from '@/lib/server-actions/board-actions';
import { Label } from '@/app/components/Label';
import Form from '@/app/components/Form';
import { Input } from '@/app/components/Input';
import CloseIcon from '@/app/components/icons/CloseIcon';
import { Board, Column } from '@/app/types';
import { cloneDeep } from 'lodash';
import { UI_TEXTS } from '@/app/features/board/boardUIConstants';

const titleSchema = z.string().min(1);
const columnSchema = z.object({
  title: z.string().min(1),
});

type BoardFormProps = {
  board?: Board | null;
  onClose: () => void;
};

const BoardForm = ({ board = null, onClose }: BoardFormProps) => {
  const localColumns: Column[] | undefined = cloneDeep(board?.columns);
  const [title, setTitle] = useState<string>(board?.title || '');
  const [columns, setColumns] = useState<Column[]>(localColumns || []);

  const parseTitle = titleSchema.safeParse(title);
  const parseColumns = columnSchema.array().safeParse(columns);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleColumnChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const updatedColumns = columns.map((column) =>
      column.id === id ? { ...column, title: e.target.value } : column
    );
    setColumns(updatedColumns);
  };

  const handleRemoveColumn = (index: number) => {
    const remainingColumns = columns.filter((_, i) => i !== index);
    setColumns(remainingColumns);
  };

  const addEmptyColumn = () => {
    setColumns([
      ...columns,
      { id: Date.now().toString(), title: '', color: '' },
    ]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
    return board != null
      ? await updateBoard(board.id, title, columns)
      : await createBoard(title, columns);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor={UI_TEXTS.form.nameField.label.for}
            name={`${board ? UI_TEXTS.form.nameField.label.existingBoard : UI_TEXTS.form.nameField.label.newBoard}`}
          />
          <Input
            id={UI_TEXTS.form.nameField.label.for}
            value={title}
            onChange={handleTitleChange}
            placeholder={UI_TEXTS.form.nameField.placeholder}
          />
        </div>
        <div role="group" className="flex flex-col gap-2">
          {columns.length > 0 && (
            <h3 className="text-body-small text-textMuted">
              {UI_TEXTS.form.columnsGroup}
            </h3>
          )}
          <div className="flex flex-col gap-3">
            {columns.map(({ title, id }, index) => (
              <div className="flex justify-between gap-4" key={index}>
                <Input
                  id="column"
                  value={title}
                  onChange={(e) => handleColumnChange(id, e)}
                />
                <button type="button" onClick={() => handleRemoveColumn(index)}>
                  <CloseIcon className="fill-textMuted hover:fill-errorRed" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addEmptyColumn}
              disabled={!parseColumns.success}
            >
              Add New Column
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary-sm"
          disabled={!parseTitle.success || !parseColumns.success}
        >
          {`${board ? 'Save Changes' : 'Create New Board'}`}
        </button>
      </div>
    </Form>
  );
};

export default BoardForm;
