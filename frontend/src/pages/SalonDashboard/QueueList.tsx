
import { Clock, MoreVertical } from "lucide-react";
import { useBookings, useBookSlot } from "@/hooks/useQueue";

type Props = {
  salonId: string;
};

export function QueueList({ salonId }: Props) {
  const { data, isLoading, error } = useBookings(salonId);
  const { bookSlot, isBooking } = useBookSlot(salonId);
//@ts-expect-error
  const bookings = data?.data ?? [];

  const handleBook = async () => {
    // For demo, pick first serviceId from first booking or 1 as fallback
    const serviceId = bookings[0]?.serviceId ?? 1;
    try {
      await bookSlot({ serviceId });
      // optionally show toast
    } catch (err) {
      // handle error
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col gap-md">
      <div className="flex justify-between items-end mb-sm border-b border-surface-container-high pb-sm">
        <div>
          <h3 className="font-card-title text-card-title">Live Queue</h3>
          <p className="font-meta-label text-meta-label text-on-surface-variant">{data?.pagination?.totalRecords ?? 0} Waiting</p>
        </div>
        <div className="bg-surface-container text-on-surface px-3 py-1 rounded-full font-meta-label text-meta-label flex items-center gap-1">
          <Clock className="h-4 w-4" />
          Avg Wait: 14 mins
        </div>
      </div>

      {/* Queue List */}
      <div className="flex flex-col gap-sm">
        {isLoading && <div>Loading queue...</div>}
        {error && <div className="text-error">Failed to load queue</div>}

        {!isLoading && bookings.length === 0 && (
          <div className="p-md text-on-surface-variant">No bookings yet</div>
        )}

        {bookings.map((b: any) => (
          <div
            key={b.id}
            className={`flex items-center justify-between p-md bg-surface-container-lowest rounded-md border border-surface-container-high shadow-[0px_2px_8px_rgba(0,0,0,0.02)]`}
          >
            <div className="flex items-center gap-md">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center font-card-title">{`#${b.tokenNumber}`}</div>
              <div className="flex flex-col">
                <span className="font-card-title text-card-title">{b.user?.name ?? `User ${b.userId}`}</span>
                <span className="font-meta-label text-meta-label text-on-surface-variant">{b.service?.name ?? `Service ${b.serviceId}`}</span>
              </div>
            </div>
            <button className="text-primary p-2 hover:bg-primary/10 rounded-full transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleBook} disabled={isBooking} className="w-full py-md mt-sm border border-outline-variant text-primary rounded-lg font-body-cta text-body-cta hover:bg-primary/5 transition-colors">
        {isBooking ? "Booking..." : "Book Token"}
      </button>
    </section>
  );
}

