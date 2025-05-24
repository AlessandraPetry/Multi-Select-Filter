import { useQuery } from '@tanstack/react-query';

export const useFetch = <T>(key: string, fetchFn: () => Promise<T>) => {
  const { data, isLoading, isError, error } = useQuery<T>({
    queryKey: [key],
    queryFn: fetchFn,
  });

  return { data, isLoading, isError, error };
};
