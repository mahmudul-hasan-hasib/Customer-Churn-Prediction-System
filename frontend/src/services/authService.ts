import apiClient from "./apiClient";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login/", payload);
  return response.data;
};

export const register = async (payload: RegisterPayload) => {
  const response = await apiClient.post("/auth/register/", payload);
  return response.data;
};

export const saveTokens = (tokens: LoginResponse) => {
  localStorage.setItem("accessToken", tokens.access);
  localStorage.setItem("refreshToken", tokens.refresh);
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("accessToken"));
};