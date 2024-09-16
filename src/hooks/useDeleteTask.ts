import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useDeleteTask = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(`http://localhost:8000/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return mutation;
};

export default useDeleteTask;
