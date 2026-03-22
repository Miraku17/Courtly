import api from "@/lib/api";
import type { CreateBookingPayload } from "@/types/booking";

export const checkAvailability = (courtId: string, date: string) =>
  api
    .get(`/bookings/availability?courtId=${courtId}&date=${date}`)
    .then((res) => res.data);

export const createBooking = (data: CreateBookingPayload) =>
  api.post("/bookings", data).then((res) => res.data);

export const getMyBookings = () =>
  api.get("/bookings?role=player").then((res) => res.data);

export const getVenueBookings = (status?: string) =>
  api
    .get(`/bookings?role=owner${status ? `&status=${status}` : ""}`)
    .then((res) => res.data);

export const cancelBooking = (id: string, reason?: string) =>
  api
    .patch(`/bookings/${id}`, {
      status: "CANCELLED",
      cancellationReason: reason,
    })
    .then((res) => res.data);

export const updateBookingStatus = (
  id: string,
  status: "CONFIRMED" | "REJECTED",
  reason?: string
) =>
  api
    .patch(`/bookings/${id}`, { status, cancellationReason: reason })
    .then((res) => res.data);
