import { useQuery } from "@tanstack/react-query";
import { api } from "@/APis/api";
import type { TodayAnalyticsData } from "@/APis/Types";

export const useTodayAnalytics = (salonId: string) => {
  return useQuery<TodayAnalyticsData | undefined>({
    queryKey: ["analytics", salonId],
    queryFn: async () => {
      const res = await api.getTodayAnalytics(salonId);
      return res.data;
    },
    enabled: Boolean(salonId),
  });
};

export default useTodayAnalytics;
