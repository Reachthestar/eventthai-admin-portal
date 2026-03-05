import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { LoginReq, LoginRes, RegisterReq, RegisterRes } from "@/types/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginReq): Promise<LoginRes> => {
      const response = await api.post("/api/login", data);

      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterReq): Promise<RegisterRes> => {
      const response = await api.post("/api/register", data);

      return response.data;
    },
  });
};
