import { useGetTaskCounts, useGetTasks } from "@/hooks";
import { Button, Grid, Typography } from "@mui/material";
import { type SyntheticEvent, useState } from "react";
import AddTask from "./AddTask";
import TasksDashboardPanels from "./TasksDashboardPanels";
import TasksDashboardTabs from "./TasksDashboardTabs";

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

	useGetTaskCounts({ setTaskCounts, data });

	const handleTabChange = (_e: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const toggleAddTask = () => {
		setAddTask(!addTask);
	};

	if (isPending) {
		return <span>Loading tasks...</span>;
	}

	if (isError) {
		return <span>Error loading tasks: {error.message}</span>;
	}

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
			<TasksDashboardPanels value={value} data={data} />
			{addTask ? (
				<AddTask toggleAddTask={toggleAddTask} />
			) : (
				<Button onClick={() => setAddTask(true)}>Add task</Button>
			)}
		</Grid>
	);
}
