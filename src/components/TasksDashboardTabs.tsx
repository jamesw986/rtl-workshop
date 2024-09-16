import { Tab, Tabs, Tooltip } from '@mui/material';
import TaskCounts from '../types/TaskCounts';
import { SyntheticEvent } from 'react';

interface TasksDashboardTabsProps {
  value: number;
  handleChange: (e: SyntheticEvent) => void;
  taskCounts: TaskCounts;
}

export default function TasksDashboardTabs(props: TasksDashboardTabsProps) {
  const { value, handleChange, taskCounts } = props;

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab
        label={
          <Tooltip title="All open tasks">
            <div>{`All tasks [${taskCounts.all}]`} </div>
          </Tooltip>
        }
        sx={{
          '&:focus': { outline: 'none' },
        }}
      />
      <Tab
        label={
          <Tooltip title="Tasks due today">
            <div>{`Today [${taskCounts.today}]`} </div>
          </Tooltip>
        }
        sx={{
          '&:focus': { outline: 'none' },
        }}
      />
      <Tab
        label={
          <Tooltip title="Tasks due within a week">
            <div>{`Upcoming [${taskCounts.upcoming}]`} </div>
          </Tooltip>
        }
        sx={{
          '&:focus': { outline: 'none' },
        }}
      />
      <Tab
        label={
          <Tooltip title="Overdue tasks">
            <div>{`Overdue [${taskCounts.overdue}]`} </div>
          </Tooltip>
        }
        sx={{
          '&:focus': { outline: 'none' },
        }}
      />
      <Tab
        label={
          <Tooltip title="Tasks marked as done">
            <div>{`Archive [${taskCounts.archived}]`} </div>
          </Tooltip>
        }
        sx={{
          '&:focus': { outline: 'none' },
        }}
      />
    </Tabs>
  );
}
