import apiClient from "./apiClient";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login/", payload);
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