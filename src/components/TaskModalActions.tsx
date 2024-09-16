import { Button } from '@mui/material';
import { FC } from 'react';

export default function TaskModalActions({ context, handlers }) {
  const { handleClose, handleSave, handleDone, handleDelete } = handlers;
  if (context === 'archive') {
    return (
      <>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
      </>
    );
  }

  return (
    <>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={handleDone}>Mark as done</Button>
      <Button color="error" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}
