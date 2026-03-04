import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useGetUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", { page }],
    queryFn: async () => {
      const response = await api.get(`/api/ftireo/users?page=${page}`);

      console.log("useGetUsers", response.data);
      return response.data;
    },
  });
};
