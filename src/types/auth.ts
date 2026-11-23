export interface LoginInput {
  email: string;
  password: string;
}

export interface ActionResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  errors?: {
    email?: string[];
    password?: string[];
  };
}