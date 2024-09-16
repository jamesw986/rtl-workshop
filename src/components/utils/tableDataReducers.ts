import Task from '../../types/Task';

const tableDataReducers = {
  allTasks: allTasksTableFunc,
  today: todayTableFunc,
  upcoming: upcomingTableFunc,
  overdue: overdueTableFunc,
  archive: archiveTableFunc,
};

function allTasksTableFunc(data: Task[]) {
  return data.filter((task) => task.done !== true);
}

function todayTableFunc(data: Task[]) {
  const today = new Date().toDateString();

  return data.filter((task) => {
    const dueDate = new Date(task.dueDate).toDateString();
    return dueDate === today;
  });
}

function upcomingTableFunc(data: Task[]) {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  today.setHours(0, 0, 0, 0);

  return data.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= nextWeek;
  });
}

function archiveTableFunc(data: Task[]) {
  return data.filter((task) => task.done === true);
}

function overdueTableFunc(data: Task[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return data.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  });
}

export default tableDataReducers;
