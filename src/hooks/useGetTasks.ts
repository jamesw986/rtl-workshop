import api from "@/libs/api";
import type { Task } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetTasks() {
	async function getTasks(): Promise<Task[]> {
		const response = await api.get("http://localhost:8000/tasks");
		return response.data;
	}

	return useQuery({
		queryKey: ["tasks"],
		queryFn: getTasks,
	});
}
