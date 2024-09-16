import { TableCell, TableRow } from '@mui/material';
import Task from '../types/Task';

export default function TaskEntry(props: TaskEntryProps) {
  const { task } = props;

  return (
    <TableRow key={task.id}>
      <TableCell component="th" scope="row">
        {task.title}
      </TableCell>
      <TableCell align="center">{task.body}</TableCell>
      <TableCell align="center">{task.done ? 'Yes' : 'No'}</TableCell>
      <TableCell>Edit</TableCell>
      <TableCell>Delete</TableCell>
    </TableRow>
  );
}

interface TaskEntryProps {
  task: Task;
}
