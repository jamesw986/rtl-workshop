import tableDataReducers from "@/components/utils/tableDataReducers";
import type { Task, TaskCounts } from "@/types";
import { useEffect } from "react";

interface useGetTaskCountsProps {
	setTaskCounts: (taskCounts: TaskCounts) => void;
	data: Task[] | undefined;
}

export function useGetTaskCounts(props: useGetTaskCountsProps) {
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
	}, [data, setTaskCounts]);
}
