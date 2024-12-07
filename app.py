from flask import Flask, jsonify
from flask_cors import CORS  # Importer CORS
from dotenv import load_dotenv
import os
import requests

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Créer une instance de l'application Flask
app = Flask(__name__)

# Activer CORS pour toutes les origines
CORS(app)  # Cela permet à n'importe quelle origine d'accéder à votre API

# Configurer la clé secrète depuis l'environnement
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

@app.route('/api/python-report', methods=['GET'])
def get_report():
    # Exemple de récupération de données depuis une autre API
    try:
        response = requests.get('https://1bde-197-30-220-251.ngrok-free.app/api/products/all')  # Remplacer par l'URL de l'API
        report_data = response.json()  # Si l'API renvoie des données au format JSON
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Erreur lors de la récupération des données de l'API externe", "message": str(e)}), 500

    return jsonify(report_data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
