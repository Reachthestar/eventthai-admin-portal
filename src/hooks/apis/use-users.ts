import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { User } from "@/types/users";

export const useGetUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", { page }],
    queryFn: async () => {
      const response = await api.get(`/api/users?page=${page}`);

      return response.data;
    },
  });
};
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (user: User) => {
      const response = await api.put(`/api/users/${user.id}`, user);

      return response.data;
    },
  });
};
