import { QueryClient, isServer } from "@tanstack/react-query";

function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		return createQueryClient();
	} else if (!browserQueryClient) {
		browserQueryClient = createQueryClient();
	}
	return browserQueryClient;
}
