const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors()); // Habilita CORS para todas las rutas

// Configuración del puerto
app.get("/apigame/:gameId", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const apiKey = process.env.API_KEY;
    const headers = { Authorization: apiKey };

    // Hacemos la petición a la API de itch.io
    const response = await axios.get(`https://api.itch.io/games/${gameId}`, {
      headers,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos del juego" });
  }
});
