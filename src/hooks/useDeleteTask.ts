import api from "@/libs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteTask(id: string) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			return api.delete(`http://localhost:8000/tasks/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	return mutation;
}
