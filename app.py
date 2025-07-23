import os
import requests
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

# Configuración del puerto
PORT = int(os.getenv("PORT", 1003))

@app.route("/apigame/<int:game_id>", methods=["GET"])
def get_game(game_id):
    try:
        api_key = int(os.getenv("API_KEY"))
        headers = {"Authorization": api_key}
        
        # Hacemos la petición a la API de itch.io
        response = requests.get(
            f"https://api.itch.io/games/{game_id}",
            headers=headers
        )
        response.raise_for_status()  # Lanza excepción si hay error HTTP
        
        return jsonify(response.json())
    
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error al obtener los datos del juego"}), 500

if __name__ == "__main__":
    app.run(port=PORT, debug=True)