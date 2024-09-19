import { QueryClient } from "@tanstack/react-query";
import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderComponent } from "../testing/testHelpers";
import TasksDashboardTabs from "./TasksDashboardTabs";
import "@testing-library/jest-dom";

describe("TasksDashboardTabs", () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	/*
    This is an overcomplicated example to showcase other methods
    of getting elements. The test below this shows a simpler approach
    that would be preferable in practice
  */
	it("renders with the correct tabs (complex)", async () => {
		// -------------------- Arrange --------------------
		const props = {
			value: 1,
			handleChange: vi.fn(),
			taskCounts: {
				all: 0,
				today: 0,
				upcoming: 0,
				overdue: 0,
				archived: 0,
			},
		};

		renderComponent({
			queryClient,
			Component: <TasksDashboardTabs {...props} />,
		});

		// -------------------- Act -------------------- N/A

		// -------------------- Assert --------------------
		/*
      We can search by role, which is RTL's priority #1
      query method. It is common to pass an options object as
      the second arg with a property "name", which will match the
      accessible name (usually matches corresponding display text).
    */
		const dashboardTabs = await screen.findAllByRole("tab");

		const expectedTabs = [
			"All tasks",
			"Today",
			"Upcoming",
			"Overdue",
			"Archive",
		];

		dashboardTabs.forEach((tab, index) => {
			// We can use getBy here since the above findBy query resolved the Promise required for the tabs to load
			// We set the "exact" option here to false so we perform a loose match on the text
			// The "within" function binds a DOM element to the query functions, allowing us to query only within that element
			const currentTab = within(tab).getByText(expectedTabs[index], {
				exact: false,
			});
			expect(currentTab).toBeInTheDocument();
		});
	});

	it("renders with the correct tabs (simple)", async () => {
		// -------------------- Arrange --------------------
		const props = {
			value: 1,
			handleChange: vi.fn(),
			taskCounts: {
				all: 0,
				today: 0,
				upcoming: 0,
				overdue: 0,
				archived: 0,
			},
		};

		renderComponent({
			queryClient,
			Component: <TasksDashboardTabs {...props} />,
		});

		// -------------------- Act -------------------- N/A

		// -------------------- Assert --------------------
		const allTasksTab = await screen.findByText("All tasks", { exact: false });
		const todayTab = screen.getByText("Today", { exact: false });
		const upcomingTab = screen.getByText("Upcoming", { exact: false });
		const overdueTab = screen.getByText("Overdue", { exact: false });
		const archiveTab = screen.getByText("Archive", { exact: false });

		expect(allTasksTab).toBeInTheDocument();
		expect(todayTab).toBeInTheDocument();
		expect(upcomingTab).toBeInTheDocument();
		expect(overdueTab).toBeInTheDocument();
		expect(archiveTab).toBeInTheDocument();
	});

	it("renders tabs with the correct counts", async () => {
		// -------------------- Arrange --------------------
		const props = {
			value: 1,
			handleChange: vi.fn(),
			taskCounts: {
				all: 3,
				today: 1,
				upcoming: 1,
				overdue: 1,
				archived: 4,
			},
		};

		renderComponent({
			queryClient,
			Component: <TasksDashboardTabs {...props} />,
		});

		// -------------------- Act -------------------- N/A

		// -------------------- Assert --------------------
		const allTasksTab = await screen.findByText(
			`All tasks [${props.taskCounts.all}]`,
		);

		const todayTab = screen.getByText(`Today [${props.taskCounts.today}]`);

		const upcomingTab = screen.getByText(
			`Upcoming [${props.taskCounts.upcoming}]`,
		);

		const overdueTab = screen.getByText(
			`Overdue [${props.taskCounts.overdue}]`,
		);

		const archiveTab = screen.getByText(
			`Archive [${props.taskCounts.archived}]`,
		);

		expect(allTasksTab).toBeInTheDocument();
		expect(todayTab).toBeInTheDocument();
		expect(upcomingTab).toBeInTheDocument();
		expect(overdueTab).toBeInTheDocument();
		expect(archiveTab).toBeInTheDocument();
	});
});
