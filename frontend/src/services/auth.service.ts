import { httpClient } from "./base-api.service";
import { API_ENDPOINTS } from "../transversal/components/constants/api.constants";
import { clearAll } from "../utils/storage.util";
import type {
  AuthResponse,
  LoginFormData,
  RegisterFormData,
} from "../types";

export async function login(payload: LoginFormData): Promise<AuthResponse> {
  console.log('[auth.service] login payload', payload);
  const { data } = await httpClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    payload
  );
  console.log('[auth.service] login response', data);
  return data;
}

export async function register(
  payload: RegisterFormData
): Promise<AuthResponse> {
  console.log('[auth.service] register payload', payload);
  const { data } = await httpClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.REGISTER,
    payload
  );
  console.log('[auth.service] register response', data);
  return data;
}

export function logout(): void {
  console.log('[auth.service] logout');
  clearAll();
}