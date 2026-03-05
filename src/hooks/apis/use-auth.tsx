import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { LoginReq, LoginRes } from "@/types/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginReq): Promise<LoginRes> => {
      const response = await api.post("/api/login", data);

      return response.data;
    },
  });
};
