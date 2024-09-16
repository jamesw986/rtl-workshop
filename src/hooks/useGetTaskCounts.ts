import { useEffect } from 'react';
import tableDataReducers from '../components/utils/tableDataReducers';
import TaskCounts from '../types/TaskCounts';

interface useGetTaskCountsProps {
  setTaskCounts: (taskCounts: TaskCounts) => void;
  data: any;
}

export default function useGetTaskCounts(props: useGetTaskCountsProps) {
  const { setTaskCounts, data } = props;

  useEffect(() => {
    if (data) {
      setTaskCounts({
        all: tableDataReducers.allTasks(data).length,
        today: tableDataReducers.today(data).length,
        upcoming: tableDataReducers.upcoming(data).length,
        overdue: tableDataReducers.overdue(data).length,
        archived: tableDataReducers.archive(data).length,
      });
    }
  }, [data]);
}
