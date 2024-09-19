import { useDeleteTask, useUpdateTask } from "@/hooks";
import type { Task } from "@/types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import TaskModalActions from "./TaskModalActions";

interface TaskModalProps {
	open: boolean;
	setOpen: (arg: boolean) => void;
	task: Partial<GridRenderCellParams>;
	context: "all" | "today" | "upcoming" | "overdue" | "archive";
}

export default function TaskModal(props: TaskModalProps) {
	const { open, setOpen, task, context } = props;

	const [currentTask, setCurrentTask] = useState({} as Task);
	const [taskTitle, setTaskTitle] = useState("");
	const [taskBody, setTaskBody] = useState("");
	const [taskDueDate, setTaskDueDate] = useState("");
	const [taskId, setTaskId] = useState("");

	const deletionMutation = useDeleteTask(taskId);
	const updateMutation = useUpdateTask(taskId);

	// task.row may be undefined on initial render
	useEffect(() => {
		setCurrentTask(task.row);
		setTaskTitle(task.row?.title || "");
		setTaskBody(task.row?.body || "");
		setTaskDueDate(task.row?.dueDate || "");
		setTaskId(task.id as string);
	}, [task]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		deletionMutation.mutate();
		setOpen(false);
	};

	const handleDone = () => {
		const updatedTask = {
			...currentTask,
			done: true,
		};
		updateMutation.mutate(updatedTask);
		setOpen(false);
	};

	const handleSave = () => {
		const updatedTask = {
			...currentTask,
			title: taskTitle,
			body: taskBody,
			dueDate: taskDueDate,
		};
		updateMutation.mutate(updatedTask);
		setOpen(false);
	};

	const handlers = {
		handleClose,
		handleSave,
		handleDone,
		handleDelete,
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Task Editor</DialogTitle>
			<DialogContent
				sx={{ display: "flex", flexDirection: "column", gap: "36px" }}
			>
				<TextField
					value={taskTitle}
					label="Title"
					variant="standard"
					onChange={(e) => setTaskTitle(e.target.value)}
				/>
				<TextField
					value={taskBody}
					label="Description"
					variant="standard"
					onChange={(e) => setTaskBody(e.target.value)}
				/>
				<DatePicker
					label="Due date"
					disablePast
					value={dayjs(taskDueDate)}
					onChange={(date) => date && setTaskDueDate(date.toString())}
				/>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "center" }}>
				<TaskModalActions context={context} handlers={handlers} />
			</DialogActions>
		</Dialog>
	);
}
