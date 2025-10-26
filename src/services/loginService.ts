import type { User } from "../types/user";

export interface LoginResponse {
  user: User;
  accessToken: string;
}

const loginUrl = `${import.meta.env.VITE_API_URI}/api/login`;

export const loginService = async (
  msalToken: string
): Promise<LoginResponse> => {
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
    throw new Error("Error en la autenticación");
  }

  return response.json() as Promise<LoginResponse>;
};
