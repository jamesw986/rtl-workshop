import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Task from '../types/Task';
import dayjs, { Dayjs } from 'dayjs';

interface TasksTableProps {
  data: Task[];
  dataReducer: (data: Task[]) => Task[];
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
  },
  {
    field: 'body',
    headerName: 'Body',
    width: 150,
  },
  {
    field: 'created',
    headerName: 'Created',
    width: 150,
    valueFormatter: (value?: Dayjs) => {
      if (!value) return '';

      return `${dayjs(value).format('DD/MM/YYYY')}`;
    },
  },
  {
    field: 'dueDate',
    headerName: 'Due',
    width: 150,
    valueFormatter: (value?: Dayjs) => {
      if (!value) return '';

      return `${dayjs(value).format('DD/MM/YYYY')}`;
    },
  },
];

export default function TasksTable(props: TasksTableProps) {
  const { data, dataReducer } = props;

  const tasks = dataReducer(data);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
