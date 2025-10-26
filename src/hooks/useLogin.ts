import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    isLoading,
    error,
    setIsLoading,
    setError,
  };
};
