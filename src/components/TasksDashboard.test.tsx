import { expect, it, describe, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import TasksDashboard from './TasksDashboard';
import {
  getTestData,
  getTodayTestData,
  renderComponent,
  transformTestDataDates,
} from '../testHelpers';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('TasksDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('displays the correct table when tabs are clicked', async () => {
    // Arrange
    const testData = getTodayTestData();
    vi.spyOn(axios, 'get').mockResolvedValue(testData);

    renderComponent({ queryClient, Component: <TasksDashboard /> });

    const user = userEvent.setup();

    // Act
    const todayTab = await screen.findByRole('tab', { name: 'today-tab' });
    // Check tab is not selected
    expect(todayTab).toHaveAttribute('aria-selected', 'false');

    await user.click(todayTab);

    // Assert
    // Check tab is now selected
    expect(todayTab).toHaveAttribute('aria-selected', 'true');

    // This will return the header row as the first element, hence the shift
    const tableRows = screen.getAllByRole('row');
    tableRows.shift();

    const data = transformTestDataDates(testData);
    tableRows.forEach((row, index) => {
      // We can use the jest-dom toHaveTextContent matcher to generically check for our row data
      expect(row).toHaveTextContent(data[index].id);
      expect(row).toHaveTextContent(data[index].title);
      expect(row).toHaveTextContent(data[index].body);
      expect(row).toHaveTextContent(data[index].created);
      expect(row).toHaveTextContent(data[index].dueDate);
    });
  });
});
