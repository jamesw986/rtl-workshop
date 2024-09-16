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
      <CustomTabPanel value={value} index={0} title="all">
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.allTasks}
          context="all"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} title="today">
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.today}
          context="today"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} title="upcoming">
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.upcoming}
          context="upcoming"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} title="overdue">
        <TasksTable
          data={data}
          dataReducer={tableDataReducers.overdue}
          context="overdue"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4} title="archive">
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
  title: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, title } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${title}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
