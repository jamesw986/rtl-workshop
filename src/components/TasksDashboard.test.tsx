import { expect, it, describe, vi } from 'vitest';
import { screen } from '@testing-library/react';
import TasksDashboard from './TasksDashboard';
import { getTestData, renderComponent } from '../testHelpers';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import '@testing-library/jest-dom';

vi.mock('axios');

describe('TasksDashboard', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  it('displays a loading message when retrieving tasks', () => {
    // Arrange
    renderComponent({ queryClient, Component: <TasksDashboard /> });

    // Act N/A

    // Assert
    /*
     We can use getByText here as we are not waiting for any
     asynchronous processes to complete, this text should be available
     immediately
     */
    const loadingMessage = screen.getByText('Loading tasks...');

    expect(loadingMessage).toBeInTheDocument();
  });

  it('displays an error message when task retrieval fails', async () => {
    // Arrange
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('Request failed'));

    renderComponent({ queryClient, Component: <TasksDashboard /> });

    // Act N/A

    // Assert
    /*
     We need to use findByText here to wait for the asynchronous
     call to our API to resolve
     */
    const errorMessage = await screen.findByText(
      'Error loading tasks: Request failed',
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('renders with the correct title', async () => {
    // Arrange
    vi.spyOn(axios, 'get').mockResolvedValue(getTestData());

    renderComponent({ queryClient, Component: <TasksDashboard /> });

    // Act N/A

    // Assert
    const title = await screen.findByText("James's Super Duper RTL Workshop");

    expect(title).toBeInTheDocument();
  });
});
