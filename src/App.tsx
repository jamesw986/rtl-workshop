import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TasksDashboard from "./components/TasksDashboard";

const queryClient = new QueryClient();

export default function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<QueryClientProvider client={queryClient}>
				<TasksDashboard />
			</QueryClientProvider>
		</LocalizationProvider>
	);
}
