import { useQuery } from "@tanstack/react-query";
import { checkAvailability } from "@/lib/api/bookings";
import type { AvailabilityResponse } from "@/types/booking";

export function useAvailability(
  courtId: string | null,
  date: string | null
) {
  return useQuery<AvailabilityResponse>({
    queryKey: ["availability", courtId, date],
    queryFn: () => checkAvailability(courtId!, date!),
    enabled: !!courtId && !!date,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}
