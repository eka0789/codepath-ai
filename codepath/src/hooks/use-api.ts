"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

interface UseApiOptions {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  enabled?: boolean;
}

interface UseApiResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

export function useApi<T>({ url, method = "GET", body, enabled = true }: UseApiOptions): UseApiResult<T> {
  const { data: session } = useSession();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!enabled || !session) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error?.message || "Something went wrong");
      }

      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, method, body, enabled, session]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}
