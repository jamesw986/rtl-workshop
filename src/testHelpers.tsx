import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Task from './types/Task';

interface RenderComponentProps {
  queryClient: QueryClient;
  Component: ReactNode;
}

export function renderComponent(props: RenderComponentProps) {
  const { queryClient, Component } = props;

  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        {Component}
      </QueryClientProvider>
    </LocalizationProvider>,
  );
}

export interface TestData {
  data: Task[];
}

export function getTestData(): TestData {
  return {
    data: [
      {
        id: uuidv4(),
        title: 'test title 1',
        body: 'test body 1',
        dueDate: dayjs(Date.now()).hour(23).toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
    ],
  };
}

export function getAllTasksTestData(): TestData {
  return {
    data: [
      {
        id: uuidv4(),
        title: 'All title 1',
        body: 'All body 1',
        dueDate: dayjs(Date.now()).hour(23).toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
      {
        id: uuidv4(),
        title: 'All title 2',
        body: 'All body 2',
        dueDate: dayjs(Date.now()).add(3, 'day').toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
      {
        id: uuidv4(),
        title: 'All title 3',
        body: 'All body 3',
        dueDate: dayjs(Date.now()).add(15, 'day').toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
    ],
  };
}

export function getTodayTestData(): TestData {
  return {
    data: [
      {
        id: uuidv4(),
        title: 'Today title 1',
        body: 'Today body 1',
        dueDate: dayjs(Date.now()).hour(23).toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
    ],
  };
}

export function getUpcomingTestData(): TestData {
  return {
    data: [
      {
        id: uuidv4(),
        title: 'Upcoming title 1',
        body: 'Upcoming body 1',
        dueDate: dayjs(Date.now()).add(3, 'day').toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
    ],
  };
}

export function getOverdueTestData(): TestData {
  return {
    data: [
      {
        id: uuidv4(),
        title: 'Overdue title 1',
        body: 'Overdue body 1',
        dueDate: dayjs(Date.now()).subtract(3, 'day').toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
    ],
  };
}

export function getArchiveTestData(): TestData {
  return {
    data: [
      {
        id: uuidv4(),
        title: 'Archive title 1',
        body: 'Archive body 1',
        dueDate: dayjs(Date.now()).subtract(3, 'day').toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: true,
      },
    ],
  };
}

export function getPaginationTestData(): TestData {
  const testData = [];
  for (let i = 0; i < 15; i++) {
    testData.push(...getTestData().data);
  }

  return {
    data: testData,
  };
}

export function getColumnSortingTestData(): TestData {
  return {
    data: [
      {
        id: uuidv4(),
        title: 'All title 2',
        body: 'All body 2',
        dueDate: dayjs(Date.now()).hour(23).toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
      {
        id: uuidv4(),
        title: 'All title 3',
        body: 'All body 3',
        dueDate: dayjs(Date.now()).add(3, 'day').toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
      {
        id: uuidv4(),
        title: 'All title 1',
        body: 'All body 1',
        dueDate: dayjs(Date.now()).add(15, 'day').toISOString(),
        created: dayjs(Date.now()).toISOString(),
        done: false,
      },
    ],
  };
}

export function transformTestDataDates(testData: TestData) {
  return testData.data.map((task) => {
    const formattedDueDate = dayjs(task.dueDate).format('DD/MM/YYYY');
    const formattedCreationDate = dayjs(task.created).format('DD/MM/YYYY');

    return {
      ...task,
      dueDate: formattedDueDate,
      created: formattedCreationDate,
    };
  });
}
