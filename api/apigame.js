const { createServer } = require("http");
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const gameId = req.url.split("/").pop(); // Extrae el gameId de la URL
    const apiKey = process.env.API_KEY;
    const headers = { Authorization: apiKey };

    const response = await axios.get(`https://api.itch.io/games/${gameId}`, {
      headers,
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Error al obtener los datos del juego" }));
  }
};
