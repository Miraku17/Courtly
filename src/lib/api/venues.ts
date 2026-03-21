import api from "@/lib/api";
import { compressImage } from "@/lib/image-utils";

export type DaySchedule = { enabled: boolean; open: string; close: string };
export type OperatingHours = Record<string, DaySchedule>;

export const createVenue = (data: {
  name: string;
  type: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  description?: string;
  imageUrl?: string;
  lat?: number;
  lng?: number;
  operatingHours?: OperatingHours;
  tags?: string[];
}) => api.post("/venues", data).then((res) => res.data);

export const getMyVenue = () =>
  api.get("/venues/me").then((res) => res.data);

export const getPublicVenues = () =>
  api.get("/venues").then((res) => res.data);

export const updateMyVenue = (data: {
  name?: string;
  type?: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  description?: string;
  imageUrl?: string;
  lat?: number;
  lng?: number;
  operatingHours?: OperatingHours;
  tags?: string[];
}) => api.patch("/venues/me", data).then((res) => res.data);

export const uploadVenueLogo = async (file: File) => {
  const compressed = await compressImage(file);
  const formData = new FormData();
  formData.append("file", compressed);
  return api.post("/venues/me/logo", formData).then((res) => res.data);
};

export const uploadVenueQRPayment = async (file: File) => {
  const compressed = await compressImage(file);
  const formData = new FormData();
  formData.append("file", compressed);
  return api.post("/venues/me/qr-payment", formData).then((res) => res.data);
};
