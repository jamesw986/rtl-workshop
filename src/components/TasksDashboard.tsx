import {
  Grid,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import useGetTasks from '../hooks/useGetTasks';
import { useState, SyntheticEvent, useEffect } from 'react';
import TasksTable from './TasksTable';
import AddTask from './AddTask';
import tableDataReducers from './utils/tableDataReducers';
import useGetTaskCounts from '../hooks/useGetTaskCounts';
import TasksDashboardTabs from './TasksDashboardTabs';

export default function TasksDashboard() {
  const [value, setValue] = useState(0);
  const [addTask, setAddTask] = useState(false);
  const [taskCounts, setTaskCounts] = useState({
    all: 0,
    today: 0,
    upcoming: 0,
    overdue: 0,
    archived: 0,
  });

  const { isPending, isError, data, error } = useGetTasks();

  useGetTaskCounts(setTaskCounts, data);

  if (isPending) {
    return <span>Loading tasks...</span>;
  }

  if (isError) {
    return <span>Error loading tasks: {error.message}</span>;
  }

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleAddTask = () => {
    setAddTask(!addTask);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography gutterBottom variant="h4">
        James's Super Duper RTL Workshop
      </Typography>
      <TasksDashboardTabs
        value={value}
        handleChange={handleTabChange}
        taskCounts={taskCounts}
      />
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
      {addTask ? (
        <AddTask toggleAddTask={toggleAddTask} />
      ) : (
        <Button onClick={() => setAddTask(true)}>Add task</Button>
      )}
    </Grid>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
