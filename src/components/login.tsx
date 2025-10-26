import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { handleLoginMs, authError } = useAuth();

  useEffect(() => {
    if (authError) {
      // Manejar el error de autenticación (por ejemplo, mostrar un mensaje)
      alert(`Error de autenticación: ${authError}`);
    }
  }, [authError]);

  return (
    <div>
      <button onClick={handleLoginMs}>Login con Microsoft</button>
    </div>
  );
};
