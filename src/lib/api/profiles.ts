import api from "@/lib/api";
import { compressImage } from "@/lib/image-utils";

export const updateProfile = (data: {
  firstName?: string;
  lastName?: string;
  phone?: string;
}) => api.patch("/profiles/me", data).then((res) => res.data);

export const getProfile = () =>
  api.get("/profiles/me").then((res) => res.data);

export const uploadAvatar = async (file: File) => {
  const compressed = await compressImage(file);
  const formData = new FormData();
  formData.append("file", compressed);
  return api.post("/profiles/me/avatar", formData).then((res) => res.data);
};

