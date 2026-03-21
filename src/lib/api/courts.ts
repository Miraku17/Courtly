import api from "@/lib/api";

export const createCourt = (data: {
  name: string;
  sportType: string;
  surfaceType?: string;
  pricePerHour: number;
  isIndoor?: boolean;
}) => api.post("/courts", data).then((res) => res.data);

export const getMyCourts = () =>
  api.get("/courts").then((res) => res.data);

export const updateCourt = (
  id: string,
  data: {
    name?: string;
    sportType?: string;
    surfaceType?: string;
    pricePerHour?: number;
    isIndoor?: boolean;
    isActive?: boolean;
  }
) => api.patch(`/courts/${id}`, data).then((res) => res.data);

export const deleteCourt = (id: string) =>
  api.delete(`/courts/${id}`).then((res) => res.data);
