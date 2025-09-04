import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // data remains fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // unused data cached for 10 minutes
      retry: 1,                   // auto retry on failure once
    },
  },
});
