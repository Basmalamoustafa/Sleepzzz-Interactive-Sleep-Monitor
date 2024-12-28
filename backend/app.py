from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def home():
    return "Flask is running!"

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Test successful!"})

@app.route('/save-data', methods=['POST'])
def save_data():
    data = request.json
    file_path = "user_data.json"
    
    try:
        with open(file_path, 'w') as file:
            json.dump([data], file, indent=2)  # Save as an array of data
        return jsonify({"message": "Data saved successfully"}), 200
    except Exception as e:
        print(f"Error saving data: {e}")
        return jsonify({"message": "Failed to save data"}), 500

@app.route('/add-data', methods=['POST'])
def add_data():
    data = request.json
    file_path = "user_data.json"
    
    try:
        try:
            with open(file_path, 'r') as file:
                existing_data = json.load(file)
        except FileNotFoundError:
            existing_data = []  
        except json.JSONDecodeError:
            existing_data = []  

        if not isinstance(existing_data, list):
            existing_data = []

        existing_data.append(data)
        
        with open(file_path, 'w') as file:
            json.dump(existing_data, file, indent=2)
        
        return jsonify({"message": "Data added successfully"}), 200
    except Exception as e:
        print(f"Error saving data: {e}")
        return jsonify({"message": "Failed to save data"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
