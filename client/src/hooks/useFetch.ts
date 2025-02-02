import { useState } from "react";

export default function useFetch({
  url,
  body,
  method,
  onSuccess,
  onFailure,
  onComplete,
  startLoading = false,
  initialData,
}: {
  url: string;
  body?: Record<string, any>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  onSuccess?: (result: any) => void;
  onFailure?: (errorMessage: string) => void;
  onComplete?: (result: any) => void;
  startLoading?: boolean;
  initialData?: any;
}) {
  const [loading, setLoading] = useState(startLoading);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(initialData);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    let result;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1${url}`,
        {
          method: method || body ? "POST" : "GET",
          body: body ? JSON.stringify(body) : undefined,
          headers: { "Content-Type": "Application/json" },
          credentials: "include",
        },
      );

      result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setData(result.data);
      onSuccess && onSuccess(result);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      onFailure && onFailure(errorMessage);
    } finally {
      setLoading(false);
      onComplete && onComplete(result);
    }
  };

  return { fetchData, loading, error, data };
}
