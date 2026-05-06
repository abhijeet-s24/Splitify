const DEFAULT_API_BASE_URL = "http://localhost:3000";

export function createApiClient({ getToken, onUnauthorized }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

  const apiRequest = async (path, options = {}) => {
    const headers = {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    };

    const token = getToken?.();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers,
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const error = new Error(payload?.message || "Request failed.");
      error.status = response.status;
      error.payload = payload;

      if (response.status === 401) {
        onUnauthorized?.(error);
      }

      throw error;
    }

    return payload;
  };

  return { apiRequest };
}
