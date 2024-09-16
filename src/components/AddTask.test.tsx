import { describe, expect, it, vi } from 'vitest';
import { renderComponent } from '../testHelpers';
import { QueryClient } from '@tanstack/react-query';
import AddTask from './AddTask';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('AddTask', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  it('POSTs to the tasks endpoint on submit', async () => {
    // -------------------- Arrange --------------------
    const spy = vi
      .spyOn(axios, 'post')
      .mockResolvedValue('successfully posted new task');

    const props = {
      toggleAddTask: vi.fn(),
    };
    renderComponent({ queryClient, Component: <AddTask {...props} /> });

    const user = userEvent.setup();

    // -------------------- Act --------------------
    // Fill in title input
    /*
        Notice we use getByLabelText here. If there is an actual input element with an associated
        label element, getByLabelText will return the input
     */
    const titleInput = screen.getByLabelText('Task title');
    await user.type(titleInput, 'example title 1');
    expect(titleInput).toHaveValue('example title 1');

    /*
        A caveat worth mentioning here is that if you called screen.debug() to verify
        the input's value has changed, you will still see the input as blank. Fear not,
        your input's value has changed, as evidenced by the above assertion. This is not a bug
        in RTL, but caused by React. Our input is a 'controlled' input, meaning its value is
        controlled by state. React may not update the value attribute in the DOM for
        controlled inputs, meaning it is not reflected in the DOM tree output by screen.debug().
        To see what the value is, you can do console.log(titleInput.value)
    */

    // Fill in the body input
    // Another (preferred) way to get the input is via getByRole
    const bodyInput = screen.getByRole('textbox', { name: 'Task body' });
    await user.type(bodyInput, 'example body 1');
    expect(bodyInput).toHaveValue('example body 1');

    // Select the due date
    const openDatePickerButton = screen.getByRole('button', {
      name: 'Choose date',
    });
    await user.click(openDatePickerButton);

    /*
      For similar reasons to the above caveat, we won't actually see the calendar popup in the DOM tree if we run screen.debug().
      For situations like this we can run our app and use the browser's developer tools to inspect the page's DOM.
      In this case when the above button is clicked, we see new nodes appear in the DOM tree for the MUI date calendar.
      On inspection we find a few layers deep a collection of buttons with a gridcell role, each representing an individual
      date option. This is what we want for our test.
    */
    const currentDayOfMonth = new Date().getDate().toString();
    const dateOption = screen.getByRole('gridcell', {
      name: currentDayOfMonth,
    });
    await user.click(dateOption);

    const dueDateInput = screen.getByRole('textbox', { name: 'Due date' });
    expect(dueDateInput).toHaveValue(`09/${currentDayOfMonth}/2024`);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    // -------------------- Assert --------------------
    const expectedPayload = {
      id: expect.any(String),
      title: 'example title 1',
      body: 'example body 1',
      created: expect.any(String),
      dueDate: expect.any(String),
      done: false,
    };
    expect(spy).toHaveBeenCalledWith(
      'http://localhost:8000/tasks',
      expectedPayload,
    );
    expect(spy).toHaveResolvedWith('successfully posted new task');
  });

  it('prevents setting the due date to a past date', async () => {
    // -------------------- Arrange --------------------
    const props = {
      toggleAddTask: vi.fn(),
    };
    renderComponent({ queryClient, Component: <AddTask {...props} /> });

    const user = userEvent.setup();

    // -------------------- Act --------------------
    const openDatePickerButton = screen.getByRole('button', {
      name: 'Choose date',
    });
    await user.click(openDatePickerButton);

    // -------------------- Assert --------------------
    const currentDayOfMonth = new Date().getDate();
    const dateOption = screen.getByRole('gridcell', {
      name: (currentDayOfMonth - 1).toString(), // Side note: this test will fail if the current date is the 1st
    });
    expect(dateOption).toBeDisabled();
  });

  it('closes the form on cancel', async () => {
    // -------------------- Arrange --------------------
    const props = {
      toggleAddTask: vi.fn(),
    };
    renderComponent({ queryClient, Component: <AddTask {...props} /> });

    const user = userEvent.setup();

    // -------------------- Act --------------------
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    await user.click(cancelButton);

    // -------------------- Assert --------------------
    expect(props.toggleAddTask).toHaveBeenCalled();
  });
});
