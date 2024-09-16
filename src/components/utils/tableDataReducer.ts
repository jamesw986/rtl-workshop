import Task from '../../types/Task';

const tableDataReducers = {
  allTasks: allTasksTableFunc,
  today: todayTableFunc,
  upcoming: upcomingTasksTableFunc,
  archived: upcomingTasksTableFunc,
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

function upcomingTasksTableFunc(data: Task[]) {
  return data;
}

export default tableDataReducers;
