import { useQuery } from "@tanstack/react-query";
import { api } from "@/APis/api";

export const useServices = (salonId: string, pageNumber = 1, pageSize = 50) => {
  return useQuery({
    queryKey: ["services", salonId, pageNumber, pageSize],
    queryFn: async () => {
      const res = await api.getServices(salonId, pageNumber, pageSize);
      return res.data;
    },
    enabled: Boolean(salonId),
  });
};

export default useServices;
