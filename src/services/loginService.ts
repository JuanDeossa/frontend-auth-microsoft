import type { User } from "../types/user";

export interface LoginResponse {
  user: User;
  accessToken: string;
}

const loginUrl = `${import.meta.env.VITE_API_URI}/api/login`;

export const loginService = async (
  msalToken: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msalToken,
      }),
    });

    if (!response.ok) {
      let errorObj = {
        code: "InternalServerError",
        message: "Error interno de servidor",
        status: response.status,
      };
      try {
        const errorData = await response.json();
        errorObj = {
          code: errorData.error || "InternalServerError",
          message: errorData.message || "Error interno de servidor",
          status: errorData.status || response.status,
        };
      } catch (err) {
        // Si no se puede parsear el error, se mantiene el mensaje genérico
        console.error("Error al parsear la data: ", err);
      }
      throw errorObj;
    }

    return response.json() as Promise<LoginResponse>;
  } catch (err) {
    console.error("Error en el servicio de login: ", err);
    // Si es un error de red, lanza un error con mensaje estándar
    if (
      err instanceof Error &&
      err.message.toLocaleLowerCase() === "failed to fetch"
    ) {
      throw {
        code: "NetworkError",
        message: "No se pudo conectar con el servidor",
        status: 0,
      };
    }
    throw err;
  }
};
