import { useState } from "react";

export default function useFetch({
  url,
  body,
  onSuccess,
  onFailure,
  onComplete,
}: {
  url: string;
  body?: Record<string, any>;
  onSuccess?: (result: any) => void;
  onFailure?: (errorMessage: string) => void;
  onComplete?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/v1${url}`, {
        method: body ? "POST" : "GET",
        body: body ? JSON.stringify(body) : undefined,
        headers: { "Content-Type": "Application/json" },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setData(result);
      onSuccess && onSuccess(result);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      onFailure && onFailure(errorMessage);
    } finally {
      setLoading(false);
      onComplete && onComplete();
    }
  };

  return { fetchData, loading, error, data };
}
