import { useEffect } from 'react';
import tableDataReducers from '../components/utils/tableDataReducers';

export default function useGetTaskCounts(setTaskCounts, data) {
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
