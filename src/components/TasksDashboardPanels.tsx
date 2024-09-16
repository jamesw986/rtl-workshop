import { ReactNode } from 'react';
import TasksTable from './TasksTable';
import tableDataReducers from './utils/tableDataReducers';
import { Box } from '@mui/material';
import Task from '../types/Task';

interface TasksDashboardPanelsProps {
  value: number;
  data: Task[];
}

export default function TasksDashboardPanels(props: TasksDashboardPanelsProps) {
  const { value, data } = props;

  return (
    <>
      <CustomTabPanel value={value} index={0}>
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.allTasks}
          context="all"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.today}
          context="today"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.upcoming}
          context="upcoming"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.overdue}
          context="overdue"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.archive}
          context="archive"
        />
      </CustomTabPanel>
    </>
  );
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
