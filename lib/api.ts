// lib/api.ts
import axios, { AxiosRequestConfig } from "axios";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Интерфейс для отправляемых данных
export interface ApiRequestData {
  trackId?: string;
  chatId?: string;
  metadata?: Record<string, unknown>;
  coverBase64?: string;
  [key: string]: unknown; // на случай дополнительных полей
}

export async function fetchAPI<T = unknown>(
  endpoint: string,
  data: ApiRequestData,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await axios.post<ApiResponse<T>>(
      `/api/${endpoint}`,
      data,
      config
    );

    return response.data;
  } catch (err: unknown) {
    // Если ошибка Axios
    if (axios.isAxiosError(err)) {
      return {
        success: false,
        error: err.response?.data?.error || err.message,
      };
    }

    return {
      success: false,
      error: "Неизвестная ошибка",
    };
  }
}
