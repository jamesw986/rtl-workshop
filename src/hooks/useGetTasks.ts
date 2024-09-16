import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Task from '../types/Task';

async function getTasks(): Promise<Task[]> {
  const response = await axios.get('http://localhost:8000/tasks');
  return response.data;
}

export default function useGetTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
}
