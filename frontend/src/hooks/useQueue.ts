import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/APis/api";


interface BookingParams {
  serviceId?: number;
  pageNumber?: number;
  pageSize?: number;
}


export const useBookSlot = (salonId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { serviceId: number }) =>
      api.bookSlot(salonId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", salonId],
      });
    },
  });

  return {
    bookSlot: mutation.mutateAsync,
    isBooking: mutation.isPending,
    bookingError: mutation.error?.message ?? null,
  };
};



export const useBookings = (
  salonId: string,
  {
    serviceId,
    pageNumber = 1,
    pageSize = 10,
  }: BookingParams = {},
) => {
  return useQuery({
    queryKey: [
      "bookings",
      salonId,
      serviceId,
      pageNumber,
      pageSize,
    ],

    queryFn: async () => {
      const response = await api.getBookings(salonId, {
        serviceId,
        pageNumber,
        pageSize,
      });

      return response.data;
    },

    placeholderData: (previousData) => previousData,
  });
};