import api from "@/lib/api";

export const updateProfile = (data: {
  firstName?: string;
  lastName?: string;
  phone?: string;
}) => api.patch("/profiles/me", data).then((res) => res.data);

export const getProfile = () =>
  api.get("/profiles/me").then((res) => res.data);
