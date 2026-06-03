import { useQuery } from "@tanstack/react-query";
import { api } from "@/APis/api";

export const useSalons = (pageNumber = 1, pageSize = 10, search = "") => {
  return useQuery({
    queryKey: ["salons", pageNumber, pageSize, search],
    queryFn: async () => {
      const res = await api.getSalons(pageNumber, pageSize, search);
      return res.data;
    },
  });
};

export default useSalons;
