export interface Event {
  id: number;
  name: string;
  date: string;
  description?: string;
  place?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isUnauthorized?: boolean;
}

// API Response types
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface EventFormData {
  name: string;
  date: string;
  description?: string;
  place?: string;
}

// State types
export interface EventsState {
  events: Event[];
  isLoading: boolean;
  error: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
