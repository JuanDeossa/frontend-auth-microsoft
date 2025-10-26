export const loginMockService = (accessToken: string) => {
  if (accessToken !== "valid-token") {
    return Promise.reject(new Error("Token inválido"));
  }

  return new Promise<{
    accessToken: string;
    user: { id: string; email: string; name: string };
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: "mock-access-token",
        user: {
          id: "1",
          email: "user@example.com",
          name: "Mock User",
        },
      });
    }, 1000); // Simula un retardo de 1 segundo
  });
};
