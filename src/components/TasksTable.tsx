import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Task from '../types/Task';
import TaskEntry from './TaskEntry';

export default function TasksTable(props: TasksTableProps) {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Body</TableCell>
            <TableCell align="center">Done</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((task) => (
            <TaskEntry task={task} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface TasksTableProps {
  data: Task[];
}
