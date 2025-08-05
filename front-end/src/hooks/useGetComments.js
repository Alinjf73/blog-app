import { getAllCommentsApi } from "@/services/commentService";
import { useQuery } from "@tanstack/react-query";

export const useGetComments = () =>
  useQuery({
    queryKey: ["get-comments"],
    queryFn: getAllCommentsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });
