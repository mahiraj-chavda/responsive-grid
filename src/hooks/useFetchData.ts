import axiosInstance from "@/services/axiosInstance";
import { useQuery, QueryKey } from "@tanstack/react-query";
import axios from "axios";

interface FetchOptions {
  queryKey: QueryKey; // The key used for caching
  apiEndpoint: string; // The API endpoint to fetch data from
}

// Generic type for the response data
export const useFetchData = <T>({ queryKey, apiEndpoint }: FetchOptions) => {
  return useQuery<T, string>({
    queryKey,
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(apiEndpoint);
        return data;
      } catch (error) {
        // Handle Axios error
        if (axios.isAxiosError(error)) {
          // Extract and return the error message directly
          const errorMessage = error.response?.data?.error || error.message;
          throw errorMessage; // Throw just the message
        } else {
          // Handle non-Axios errors
          throw "An unexpected error occurred";
        }
      }
    },
  });
};
