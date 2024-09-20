import type { Task } from "@/types";

const isTaskDone = (task: Task) => task.done === true;

function allTasksTableFunc(data: Task[]) {
	return data.filter((task) => !isTaskDone(task));
}

function todayTableFunc(data: Task[]) {
	const today = new Date().toDateString();

	return data.filter((task) => {
		const dueDate = new Date(task.dueDate).toDateString();
		return !isTaskDone(task) && dueDate === today;
	});
}

function upcomingTableFunc(data: Task[]) {
	const today = new Date();
	const nextWeek = new Date();
	nextWeek.setDate(today.getDate() + 7);
	today.setHours(0, 0, 0, 0);

	return data.filter((task) => {
		const dueDate = new Date(task.dueDate);
		return !isTaskDone(task) && dueDate >= today && dueDate <= nextWeek;
	});
}

function archiveTableFunc(data: Task[]) {
	return data.filter(isTaskDone);
}

function overdueTableFunc(data: Task[]) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return data.filter((task) => {
		const dueDate = new Date(task.dueDate);
		return !isTaskDone(task) && dueDate < today;
	});
}

const tableDataReducers = {
	allTasks: allTasksTableFunc,
	today: todayTableFunc,
	upcoming: upcomingTableFunc,
	overdue: overdueTableFunc,
	archive: archiveTableFunc,
};

export default tableDataReducers;
