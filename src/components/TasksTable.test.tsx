import {
	type TestData,
	getAllTasksTestData,
	getArchiveTestData,
	getColumnSortingTestData,
	getOverdueTestData,
	getPaginationTestData,
	getTestData,
	getTodayTestData,
	getUpcomingTestData,
	renderComponent,
	transformTestDataDates,
} from "@/testing/testHelpers";
import { QueryClient } from "@tanstack/react-query";
import { screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TasksTable from "./TasksTable";
import tableDataReducers from "./utils/tableDataReducers";

function assertHeadersHaveRendered(headers: HTMLElement[]) {
	const expectedHeaders = ["ID", "Title", "Body", "Created", "Due", "Action"];

	headers.forEach((header) => {
		expect(expectedHeaders).toContain(header.textContent);
	});
}

interface AssertTableDataHasRenderedParams {
	testData: TestData;
	tableRows: HTMLElement[];
}

function assertTableDataHasRendered(params: AssertTableDataHasRenderedParams) {
	const { testData, tableRows } = params;

	const data = transformTestDataDates(testData);
	tableRows.forEach((row, index) => {
		// We can use the jest-dom toHaveTextContent matcher to generically check for our row data
		expect(row).toHaveTextContent(data[index].id);
		expect(row).toHaveTextContent(data[index].title);
		expect(row).toHaveTextContent(data[index].body);
		expect(row).toHaveTextContent(data[index].created);
		expect(row).toHaveTextContent(data[index].dueDate);
	});
}

describe("TasksTable", () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	describe("Table data", () => {
		it("renders the 'All Tasks' table with the expected data", async () => {
			// -------------------- Arrange --------------------
			const testData = getAllTasksTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.allTasks,
				context: "all" as const,
			};

			renderComponent({ queryClient, Component: <TasksTable {...props} /> });

			// -------------------- Act -------------------- N/A

			// -------------------- Assert --------------------
			const headers = await screen.findAllByRole("columnheader");
			assertHeadersHaveRendered(headers);

			const tableRows = screen.getAllByRole("row");
			tableRows.shift();
			assertTableDataHasRendered({ testData, tableRows });
		});

		it("renders the 'Today' table with the expected data", async () => {
			// -------------------- Arrange --------------------
			const testData = getTodayTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.today,
				context: "today" as const,
			};
			renderComponent({ queryClient, Component: <TasksTable {...props} /> });

			// -------------------- Act -------------------- N/A

			// -------------------- Assert --------------------
			/*
        Wrapping a getBy query inside a waitFor call is equivalent to a findBy query.
        This is however, bad practice. When querying for elements that will appear in the future,
        always use findBy queries. It is simpler - enhancing readability, and provides better
        error messages
      */
			const headers = await waitFor(() => screen.getAllByRole("columnheader"));
			assertHeadersHaveRendered(headers);

			const tableRows = screen.getAllByRole("row");
			tableRows.shift();
			assertTableDataHasRendered({ testData, tableRows });
		});

		it("renders the 'Upcoming' table with the expected data", async () => {
			// -------------------- Arrange --------------------
			const testData = getUpcomingTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.upcoming,
				context: "upcoming" as const,
			};
			renderComponent({ queryClient, Component: <TasksTable {...props} /> });

			// -------------------- Act -------------------- N/A

			// -------------------- Assert --------------------
			const headers = await screen.findAllByRole("columnheader");
			assertHeadersHaveRendered(headers);

			const tableRows = screen.getAllByRole("row");
			tableRows.shift();
			assertTableDataHasRendered({ testData, tableRows });
		});

		it("renders the 'Overdue' table with the expected data", async () => {
			// -------------------- Arrange --------------------
			const testData = getOverdueTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.overdue,
				context: "overdue" as const,
			};
			renderComponent({ queryClient, Component: <TasksTable {...props} /> });

			// -------------------- Act -------------------- N/A

			// -------------------- Assert --------------------
			const headers = await screen.findAllByRole("columnheader");
			assertHeadersHaveRendered(headers);

			const tableRows = screen.getAllByRole("row");
			tableRows.shift();
			assertTableDataHasRendered({ testData, tableRows });
		});

		it("renders the 'Archive' table with the expected data", async () => {
			// -------------------- Arrange --------------------
			const testData = getArchiveTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.archive,
				context: "archive" as const,
			};
			renderComponent({ queryClient, Component: <TasksTable {...props} /> });

			// -------------------- Act -------------------- N/A

			// -------------------- Assert --------------------
			const headers = await screen.findAllByRole("columnheader");
			assertHeadersHaveRendered(headers);

			const tableRows = screen.getAllByRole("row");
			tableRows.shift();
			assertTableDataHasRendered({ testData, tableRows });
		});
	});

	describe("Pagination", () => {
		it("paginates table results", async () => {
			// -------------------- Arrange --------------------
			const testData = getPaginationTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.allTasks,
				context: "all" as const,
			};

			// Note the destructuring of the render result to access 'container'. More on this below
			const { container } = renderComponent({
				queryClient,
				Component: <TasksTable {...props} />,
			});

			// -------------------- Act -------------------- N/A

			// -------------------- Assert --------------------
			/*
        Sometimes we may not have any direct access to the element we need. Ideally we
        would improve accessibility ourselves, using semantic HTML, aria attributes or IDs,
        but sometimes we may be faced with layers of abstraction that make this impossible.
        In this test the page count in the pagination footer is a simple 'p' tag wrapped
        in divs, with no labels, IDs or any other discernible way to access the count (remember
        you can use screen.debug() to check). In practice it would be simplest to just query on
        the text with getByText, but let's pretend we can't do that, what do we do?
      */

			/*
        The RTL render function's return object contains, amongst other things, the
        containing DOM node for our rendered component. This is a regular DOM node,
        so we can use a good old fashioned querySelector call. In this case let's
        access using a class name
      */
			const paginationSection = container.querySelector(
				".MuiTablePagination-root",
			);
			expect(paginationSection).toHaveTextContent("1–5 of 15");

			/*
        This is a last resort approach as you're now testing implementation details,
        which is what we're trying to avoid.
      */
		});

		it("changes page when the pagination next button is clicked", async () => {
			// -------------------- Arrange --------------------
			const testData = getPaginationTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.allTasks,
				context: "all" as const,
			};

			const { user } = renderComponent({
				queryClient,
				Component: <TasksTable {...props} />,
			});

			// -------------------- Act --------------------
			const nextPageButton = screen.getByRole("button", {
				// We have derived the name here from the element's aria-label
				name: "Go to next page",
			});

			// Remember to await userEvents
			await user.click(nextPageButton);

			// -------------------- Assert --------------------
			/*
        Since queries return DOM nodes (specifically the Element interface), we can use any methods from the DOM API
        present on that interface. As mentioned before, this is NOT recommended and is purely for demo purposes.
      */
			const paginationCount = nextPageButton
				.closest(".MuiTablePagination-root")
				?.getElementsByTagName("p")[0];

			expect(paginationCount).toHaveTextContent("6–10 of 15");

			/*
        As you can see, this greatly diminishes the quality of this test and makes
        it vulnerable to implementation changes
      */
		});

		it("changes page when the pagination previous button is clicked", async () => {
			// -------------------- Arrange --------------------
			const testData = getPaginationTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.allTasks,
				context: "all" as const,
			};

			const { user } = renderComponent({
				queryClient,
				Component: <TasksTable {...props} />,
			});

			// -------------------- Act --------------------
			/*
       The getByRole approach in the last test is the preferred approach,
       but this is another viable option. getByLabelText is primarily aimed
       at actual label elements (i.e for inputs), but it does also match
       aria-labels as is what's happening here
       */
			const nextPageButton = screen.getByLabelText("Go to next page");
			await user.click(nextPageButton);
			expect(screen.getByText("6–10 of 15")).toBeInTheDocument();

			const previousPageButton = screen.getByRole("button", {
				name: "Go to previous page",
			});
			await user.click(previousPageButton);
			expect(screen.getByText("1–5 of 15")).toBeInTheDocument();
		});
	});

	describe("Column sorting", () => {
		it("sorts the title column", async () => {
			// -------------------- Arrange --------------------
			const testData = getColumnSortingTestData();

			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.allTasks,
				context: "all" as const,
			};
			const { user } = renderComponent({
				queryClient,
				Component: <TasksTable {...props} />,
			});

			const tableRows = screen.getAllByRole("row");
			tableRows.shift();
			assertTableDataHasRendered({ testData, tableRows });

			// -------------------- Act --------------------
			const titleColumn = screen.getByRole("columnheader", { name: "Title" });
			const sortButton = within(titleColumn).getByTitle("Sort");

			// -------------------- Assert -------------------- column is sorted in ascending order
			await user.click(sortButton);
			let expectedSortedData = {
				data: testData.data.toSorted(),
			};
			assertTableDataHasRendered({ testData: expectedSortedData, tableRows });

			// -------------------- Assert -------------------- column is sorted in descending order
			await user.click(sortButton);
			expectedSortedData = {
				data: testData.data.sort((a, b) => b - a),
			};
			assertTableDataHasRendered({ testData: expectedSortedData, tableRows });
		});
	});

	describe("Task editor", () => {
		it("opens the task editor on clicking a task's 'open' button", async () => {
			// -------------------- Arrange --------------------
			const testData = getTestData();
			const props = {
				data: testData.data,
				dataReducer: tableDataReducers.allTasks,
				context: "all" as const,
			};
			const { user } = renderComponent({
				queryClient,
				Component: <TasksTable {...props} />,
			});

			// -------------------- Act -------------------- N/A
			const openButton = await screen.findByRole("button", { name: "Open" });
			await user.click(openButton);

			// -------------------- Assert --------------------
			const taskEditor = screen.getByRole("dialog", {
				name: "Task Editor",
			});

			expect(taskEditor).toBeInTheDocument();
		});
	});
});
