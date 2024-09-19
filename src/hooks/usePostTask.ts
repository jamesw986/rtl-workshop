import api from "@/libs/api";
import type { Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostTask() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (task: Task) => {
			return api.post("http://localhost:8000/tasks", task);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	return mutation;
}
