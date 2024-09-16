import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Task from '../types/Task';

export default function useUpdateTask(id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (task: Task) => {
      return axios.put(`http://localhost:8000/tasks/${id}`, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return mutation;
}
