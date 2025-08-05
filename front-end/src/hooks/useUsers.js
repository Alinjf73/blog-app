import { getAllUsersApi } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["get-users"],
    queryFn: getAllUsersApi,
    retry: false,
    refetchOnWindowFocus: true,
  });
