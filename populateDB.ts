import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import * as fs from 'node:fs';

const currentDate = Date.now();

const db = {
  tasks: [
    {
      id: uuidv4(),
      title: 'upcoming task 1',
      body: 'this is the first task for the upcoming tab',
      dueDate: dayjs(currentDate).add(1, 'day').toISOString(),
      created: dayjs(currentDate).toISOString(),
      done: false,
    },
    {
      id: uuidv4(),
      title: 'upcoming task 2',
      body: 'this is the second task for the upcoming tab',
      dueDate: dayjs(currentDate).add(3, 'day').toISOString(),
      created: dayjs(currentDate).toISOString(),
      done: false,
    },
    {
      id: uuidv4(),
      title: 'today task 1',
      body: 'this is the first task for the today tab',
      dueDate: dayjs(currentDate).hour(23).minute(59).toISOString(),
      created: dayjs(currentDate).toISOString(),
      done: false,
    },
    {
      id: uuidv4(),
      title: 'today task 2',
      body: 'this is the second task for the today tab',
      dueDate: dayjs(currentDate).hour(23).minute(59).toISOString(),
      created: dayjs(currentDate).toISOString(),
      done: false,
    },
    {
      id: uuidv4(),
      title: 'overdue task 1',
      body: 'this is the first task for the overdue tab',
      dueDate: dayjs(currentDate).subtract(1, 'day').toISOString(),
      created: dayjs(currentDate).toISOString(),
      done: false,
    },
    {
      id: uuidv4(),
      title: 'overdue task 2',
      body: 'this is the second task for the overdue tab',
      dueDate: dayjs(currentDate).subtract(1, 'day').toISOString(),
      created: dayjs(currentDate).toISOString(),
      done: false,
    },
    {
      id: uuidv4(),
      title: 'archive task 1',
      body: 'this is the first task for the archive tab',
      dueDate: dayjs(currentDate).toISOString(),
      created: dayjs(currentDate).toISOString(),
      done: true,
    },
    {
      id: uuidv4(),
      title: 'archive task 2',
      body: 'this is the second task for the archive tab',
      dueDate: dayjs(currentDate).toISOString(),
      created: dayjs(currentDate).toISOString(),
      done: true,
    },
  ],
};

export default function populateDB() {
  const json = JSON.stringify(db, null, 2);

  try {
    fs.writeFileSync('./db.json', json);
  } catch (e) {
    console.error('Failed to create file: ', e);
  }
}

populateDB();
