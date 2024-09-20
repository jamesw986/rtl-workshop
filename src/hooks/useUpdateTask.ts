import api from "@/libs/api";
import type { Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTask(id: string) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (task: Task) => {
			return api.put(`http://localhost:8000/tasks/${id}`, task);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	return mutation;
}
