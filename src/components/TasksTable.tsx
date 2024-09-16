import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import Task from '../types/Task';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import TaskModal from './TaskModal';

interface TasksTableProps {
  data: Task[];
  dataReducer: (data: Task[]) => Task[];
  context: 'all' | 'today' | 'upcoming' | 'overdue' | 'archive';
}

const getColumns = (handleOpen: (params: GridRenderCellParams) => void) => [
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
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <Button onClick={() => handleOpen(params)}>Open</Button>
    ),
  },
];

export default function TasksTable(props: TasksTableProps) {
  const { data, dataReducer, context } = props;
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});

  const tasks = dataReducer(data);

  const handleOpen = (params: GridRenderCellParams) => {
    setCurrentRowData(params);
    setTaskModalOpen(true);
  };

  const columns = getColumns(handleOpen);

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
        disableRowSelectionOnClick
      />
      <TaskModal
        open={taskModalOpen}
        setOpen={setTaskModalOpen}
        task={currentRowData}
        context={context}
      />
    </Box>
  );
}
