// API Response Types

export type ApiResponse<T> =
  | { success: true; data: T; message?: string }
  | { success: false; data?: never; message: string; errors?: Record<string, string[]> };

export type ApiErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
