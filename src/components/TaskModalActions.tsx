import { Button } from '@mui/material';

interface TaskModalActionsProps {
  context: 'all' | 'today' | 'upcoming' | 'overdue' | 'archive';
  handlers: Record<string, () => void>;
}

export default function TaskModalActions(props: TaskModalActionsProps) {
  const { context, handlers } = props;
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
