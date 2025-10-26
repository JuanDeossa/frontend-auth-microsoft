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
  res.send("Backend funcionando correctamente");
});

app.post("/api/login", (req, res) => {
  const msalToken = req.body.msalToken;

  // console.log("MSAL Token recibido en backend:", msalToken);

  setTimeout(() => {
    res.status(200).json({
      accessToken: msalToken,
      user: {
        id: "1",
        email: "johndoe666@example.com",
        name: "John Doe",
      },
    });
  }, 1500);
});
