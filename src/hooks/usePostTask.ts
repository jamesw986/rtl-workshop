import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Task from '../types/Task';

export default function usePostTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (task: Task) => {
      return axios.post('http://localhost:8000/tasks', task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return mutation;
}
