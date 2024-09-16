import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

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

export function getTestData() {
  return {
    data: [
      {
        id: uuidv4(),
        title: 'test title 1',
        body: 'test body 1',
        dueDate: Date.now().toString(),
        created: Date.now(),
        done: false,
      },
    ],
  };
}
