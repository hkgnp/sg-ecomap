import useSWR from "swr";

const fetcher = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> => {
  const res = await fetch(input, init);
  return res.json();
};

export const useResource = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/resources?${new URLSearchParams({ id })}`,
    fetcher,
  );
  return {
    resource: data,
    isLoading,
    isError: error,
    mutate: mutate,
  };
};

export const useResources = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/resources`, fetcher);
  return {
    resources: data,
    isLoading,
    isError: error,
    mutate: mutate,
  };
};

export const useComments = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/comments?${new URLSearchParams({ id })}`,
    fetcher,
  );
  return {
    comments: data,
    isLoading,
    isError: error,
    mutate: mutate,
  };
};
