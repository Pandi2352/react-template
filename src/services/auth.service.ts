import { apiClient, ENDPOINTS } from '@/api';
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';

export const authService = {
  login(data: LoginRequest) {
    return apiClient.post<ApiResponse<AuthResponse>>(ENDPOINTS.AUTH.LOGIN, data);
  },

  register(data: RegisterRequest) {
    return apiClient.post<ApiResponse<AuthResponse>>(ENDPOINTS.AUTH.REGISTER, data);
  },

  logout() {
    return apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  },

  getMe() {
    return apiClient.get<ApiResponse<User>>(ENDPOINTS.AUTH.ME);
  },
};
