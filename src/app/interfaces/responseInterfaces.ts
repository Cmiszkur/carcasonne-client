export interface AuthResponse {
  statusCode: number;
  message: string;
}

export interface loginUser {
  username: string;
  password: string;
}

export interface UserResponse {
  username: string;
  name: string;
  email: string;
}

export interface LoginAuthResponse {
  statusCode: number;
  message: string | UserResponse;
  error?: string;
}
