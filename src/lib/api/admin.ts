import api from "@/lib/api";

export const getAdminVenues = (status?: string) =>
  api
    .get("/admin/venues", { params: status ? { status } : {} })
    .then((res) => res.data);

export const updateVenueStatus = (
  id: string,
  data: { status: "PENDING" | "APPROVED" | "REJECTED"; notes?: string }
) => api.patch(`/admin/venues/${id}/status`, data).then((res) => res.data);
