import { describe, expect, it, vi } from 'vitest';
import { getTaskModalTestData, renderComponent } from '../testHelpers';
import TaskModal from './TaskModal';
import { screen } from '@testing-library/react';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

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

  it('closes the modal when the cancel button is clicked', async () => {
    // -------------------- Arrange --------------------
    const testData = getTaskModalTestData();

    const props = {
      open: true,
      setOpen: vi.fn(),
      task: testData,
      context: 'all' as const,
    };
    renderComponent({ Component: <TaskModal {...props} /> });

    const user = userEvent.setup();

    // -------------------- Act --------------------
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    // -------------------- Assert --------------------
    expect(props.setOpen).toHaveBeenCalledWith(false);
  });

  it("PUTs to the selected task's endpoint the expected payload when the save button is clicked", async () => {
    // -------------------- Arrange --------------------
    const testData = getTaskModalTestData();
    const spy = vi.spyOn(axios, 'put').mockResolvedValue(testData);

    const props = {
      open: true,
      setOpen: vi.fn(),
      task: testData,
      context: 'all' as const,
    };
    renderComponent({ Component: <TaskModal {...props} /> });

    const user = userEvent.setup();

    // -------------------- Act --------------------
    // Update the title field
    const titleField = screen.getByRole('textbox', { name: 'Title' });
    await user.clear(titleField);
    expect(titleField).toHaveValue('');
    await user.type(titleField, 'updated title');
    expect(titleField).toHaveValue('updated title');

    // Update the description field
    const descriptionField = screen.getByRole('textbox', {
      name: 'Description',
    });
    await user.clear(descriptionField);
    expect(descriptionField).toHaveValue('');
    await user.type(descriptionField, 'updated description');
    expect(descriptionField).toHaveValue('updated description');

    // Update the due date field
    const openDatePickerButton = screen.getByRole('button', {
      /* 
        We can pass a regex to partial match the accessible name. In this case the actual
        name is dynamic, taken from the current value. At the time of writing it looks like:
        aria-label="Choose date, selected date is Sep 13, 2024"
      */
      name: /Choose date/,
    });
    await user.click(openDatePickerButton);

    const currentDayOfMonth = new Date().getDate();
    const dateOption = screen.getByRole('gridcell', {
      name: (currentDayOfMonth + 1).toString(), // Side note: this test will fail if the current date is the end of the month
    });
    await user.click(dateOption);

    // Save the changes
    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    // -------------------- Assert --------------------
    const expectedPayload = {
      id: testData.id,
      title: 'updated title',
      body: 'updated description',
      created: expect.any(String),
      dueDate: expect.any(String),
      done: false,
    };
    expect(spy).toHaveBeenCalledWith(
      `http://localhost:8000/tasks/${testData.id}`,
      expectedPayload,
    );
    expect(props.setOpen).toHaveBeenCalledWith(false);
  });

  it("PUTs to the selected task's endpoint the expected payload when the 'Mark as done' button is clicked", async () => {
    // -------------------- Arrange --------------------
    const testData = getTaskModalTestData();
    const spy = vi.spyOn(axios, 'put').mockResolvedValue(testData);

    const props = {
      open: true,
      setOpen: vi.fn(),
      task: testData,
      context: 'all' as const,
    };
    renderComponent({ Component: <TaskModal {...props} /> });

    const user = userEvent.setup();

    // -------------------- Act --------------------
    const markAsDoneButton = screen.getByRole('button', {
      name: 'Mark as done',
    });
    await user.click(markAsDoneButton);

    // -------------------- Assert --------------------
    const expectedPayload = {
      ...testData.row,
      done: true,
    };
    expect(spy).toHaveBeenCalledWith(
      `http://localhost:8000/tasks/${testData.id}`,
      expectedPayload,
    );
    expect(props.setOpen).toHaveBeenCalledWith(false);
  });

  it("DELETEs to the selected task's endpoint when the delete button is clicked", async () => {
    // -------------------- Arrange --------------------
    const testData = getTaskModalTestData();
    const spy = vi.spyOn(axios, 'delete').mockResolvedValue(testData);

    const props = {
      open: true,
      setOpen: vi.fn(),
      task: testData,
      context: 'all' as const,
    };
    renderComponent({ Component: <TaskModal {...props} /> });

    const user = userEvent.setup();

    // -------------------- Act --------------------
    const deleteButton = screen.getByRole('button', {
      name: 'Delete',
    });
    await user.click(deleteButton);

    // -------------------- Assert --------------------
    expect(spy).toHaveBeenCalledWith(
      `http://localhost:8000/tasks/${testData.id}`,
    );
    expect(props.setOpen).toHaveBeenCalledWith(false);
  });
});
