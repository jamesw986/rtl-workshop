import { usePostTask } from "@/hooks";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import { type FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddTaskProps {
	toggleAddTask: () => void;
}

export default function AddTask(props: AddTaskProps) {
	const { toggleAddTask } = props;

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [dueDate, setDueDate] = useState<Dayjs>(dayjs(Date.now()));

	const mutation = usePostTask();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const formattedDueDate = dueDate.toISOString();
		const creationDate = dayjs(new Date()).toISOString();

		mutation.mutate({
			id: uuidv4(),
			title,
			body,
			dueDate: formattedDueDate,
			created: creationDate,
			done: false,
		});

		toggleAddTask();
	};

	return (
		<Stack spacing={2}>
			<Typography variant="h6">Add new task</Typography>
			<TextField
				id="add-task-title"
				label="Task title"
				variant="outlined"
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TextField
				id="add-task-body"
				label="Task body"
				variant="outlined"
				multiline
				onChange={(e) => setBody(e.target.value)}
			/>
			<DatePicker
				label="Due date"
				disablePast
				onChange={(date) => date && setDueDate(date)}
			/>
			<Box>
				<Button color="error" onClick={toggleAddTask}>
					Cancel
				</Button>
				<Button autoFocus onClick={handleSubmit}>
					Submit
				</Button>
			</Box>
		</Stack>
	);
}
