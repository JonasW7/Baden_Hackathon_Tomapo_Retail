import { QueryClient } from "@tanstack/react-query";

// defines a singleton query client for the app
const queryClient = new QueryClient();
export default queryClient;