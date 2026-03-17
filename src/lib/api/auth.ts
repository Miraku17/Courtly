import api from "@/lib/api";

export const signIn = (data: { email: string; password: string }) =>
  api.post("/auth/signin", data).then((res) => res.data);

export const signUp = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}) => api.post("/auth/signup", data).then((res) => res.data);

export const signOut = () => api.post("/auth/signout");
