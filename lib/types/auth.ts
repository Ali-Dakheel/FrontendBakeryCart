// User & Authentication Types

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
}
