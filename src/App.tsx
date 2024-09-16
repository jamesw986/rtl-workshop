import './App.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TasksDashboard from './components/TasksDashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const queryClient = new QueryClient();

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <TasksDashboard />
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
