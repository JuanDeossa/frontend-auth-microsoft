import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Mock backend escuchando en el puerto ${PORT}`);
});

app.get("/", (_req, res) => {
  res.send("Mock Backend funcionando correctamente");
});

app.post("/api/login", (req, res, next) => {
  const msalToken = req.body.msalToken;

  setTimeout(() => {
    /* Simular error 400 Bad Request */
    // return next({
    //   status: 400,
    //   code: "BadRequest",
    //   message: "Solicitud incorrecta",
    // });

    /* Simular error 400 Bad Request sin token */
    // return next({
    //   status: 400,
    //   code: "BadRequest",
    //   message: "Token no proporcionado",
    // });

    /* Simular error 401 Unauthorized */
    // return next({
    //   status: 401,
    //   code: "Unauthorized",
    //   message: "No autorizado",
    // });

    /* Simular error 403 Forbidden */
    // return next({
    //   status: 403,
    //   code: "Forbidden",
    //   message: "Acceso Prohibido",
    // });

    /* Successful response */
    res.status(200).json({
      accessToken: msalToken,
      user: {
        id: "1",
        email: "johndoe666@example.com",
        name: "John Doe",
      },
    });
  }, 1500); // Simular retardo de 1.5 segundos
});

/* Middleware de manejo de errores estructurado */
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.code || "InternalServerError",
    message: err.message || "Error interno de servidor",
  });
});
