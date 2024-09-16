import { describe, expect, it, vi } from 'vitest';
import { getTaskModalTestData, renderComponent } from '../testHelpers';
import TaskModal from './TaskModal';
import { screen } from '@testing-library/react';
import dayjs from 'dayjs';

describe('TaskModal', () => {
  it("prefills with its corresponding task's info", async () => {
    // -------------------- Arrange --------------------
    const testData = getTaskModalTestData();

    const props = {
      open: true,
      setOpen: vi.fn(),
      task: testData,
      context: 'all' as const,
    };
    renderComponent({ Component: <TaskModal {...props} /> });

    // -------------------- Act --------------------
    // n/a

    // -------------------- Assert --------------------
    // Assert the title field is pre-filled with our task's current title
    const titleField = screen.getByRole('textbox', { name: 'Title' });
    expect(titleField).toHaveValue(testData.row.title);

    // Assert the description field is pre-filled with our task's current body
    const descriptionField = screen.getByRole('textbox', {
      name: 'Description',
    });
    expect(descriptionField).toHaveValue(testData.row.body);

    // Assert the due date field is pre-filled with our task's current due date
    const dueDateField = screen.getByRole('textbox', { name: 'Due date' });
    expect(dueDateField).toHaveValue(
      dayjs(testData.row.dueDate).format('MM/DD/YYYY'),
    );
  });

  it("has options 'cancel', 'save', 'mark as done' and 'delete' for non-archive contexts", async () => {
    // -------------------- Arrange --------------------
    const testData = getTaskModalTestData();

    const props = {
      open: true,
      setOpen: vi.fn(),
      task: testData,
      context: 'all' as const,
    };
    renderComponent({ Component: <TaskModal {...props} /> });

    // -------------------- Act --------------------
    // n/a

    // -------------------- Assert --------------------
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeInTheDocument();

    const markAsDoneButton = screen.getByRole('button', {
      name: 'Mark as done',
    });
    expect(markAsDoneButton).toBeInTheDocument();

    /*
        A reminder that getByText is also a viable option, but getByRole is still
        preferred as it's more specific
     */
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
  });

  it("has options 'cancel' and 'delete' for the archive context", async () => {
    // -------------------- Arrange --------------------
    const testData = getTaskModalTestData();

    const props = {
      open: true,
      setOpen: vi.fn(),
      task: testData,
      context: 'archive' as const,
    };
    renderComponent({ Component: <TaskModal {...props} /> });

    // -------------------- Act --------------------
    // n/a

    // -------------------- Assert --------------------
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    const saveButton = screen.queryByRole('button', { name: 'Save' });
    expect(saveButton).not.toBeInTheDocument();

    const markAsDoneButton = screen.queryByRole('button', {
      name: 'Mark as done',
    });
    expect(markAsDoneButton).not.toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    expect(deleteButton).toBeInTheDocument();
  });
});
