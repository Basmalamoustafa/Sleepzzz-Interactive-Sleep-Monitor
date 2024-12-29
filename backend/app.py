from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import traceback
import subprocess
import joblib
import numpy as np
import librosa
import os


app = Flask(__name__)


CORS(app)

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









app.config['UPLOAD_FOLDER'] = './uploads'  

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


model_path = './models/model.pkl' 
try:
    model = joblib.load(model_path)
    print(f"Model loaded successfully from {model_path}")
except Exception as e:
    print(f"Error loading model: {e}")

@app.route('/upload-audio', methods=['POST'])
def upload_audio():
    if 'file' not in request.files:
        print("No file found in request")
        return jsonify({'message': 'No file provided'}), 400

    audio_file = request.files['file']
    print(f"Received file: {audio_file.filename}, type: {audio_file.content_type}")
    
    filepath = './uploads/' + audio_file.filename  
    
    try:
        audio_file.save(filepath)
        print(f"File saved to {filepath}")
    except Exception as e:
        print(f"Error saving file: {e}")
        return jsonify({'message': 'Error saving file'}), 500

  
    if not audio_file.filename.endswith('.wav'):
        wav_filepath = filepath.rsplit('.', 1)[0] + '.wav'
        
        if os.path.exists(wav_filepath):
            os.remove(wav_filepath)
            print(f"Removed existing file: {wav_filepath}")
        
        try:
         
            ffmpeg_path = r"C:\Users\ffmpeg-master-latest-win64-gpl\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"  
            subprocess.run([ffmpeg_path, '-i', filepath, wav_filepath], check=True)
            print(f"File converted to {wav_filepath}")
            filepath = wav_filepath
        except Exception as e:
            print(f"Error converting file: {e}")
            return jsonify({'message': 'Error converting audio file'}), 500


    try:
        features = extract_features(filepath)
        print(f"Extracted features: {features}")
    except Exception as e:
        print(f"Error extracting features: {e}")
        return jsonify({'message': f'Error extracting features: {str(e)}'}), 500


    try:
            prediction = model.predict([features])
            result = 'Snoring detected' if prediction[0] == 1 else 'No snoring'
            print(f"Prediction result: {result}")
    except Exception as e:
        return jsonify({'message': 'Error during prediction'}), 500

    return jsonify({'message': result}) 



def extract_features(filepath):
    print(f"Extracting features from file: {filepath}")
    try:
        
        y, sr = librosa.load(filepath, sr=None)
        print(f"Audio loaded with sample rate: {sr}")

       
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  
        print(f"MFCC shape: {mfcc.shape}")

       
        features = np.mean(mfcc, axis=1)  
        print(f"Extracted features shape: {features.shape}")

   
        if features.shape[0] != 1984:
            features = np.pad(features, (0, 1984 - features.shape[0]), 'constant')
            print(f"Padded features to shape: {features.shape}")

        return features
    except Exception as e:
        print(f"Error extracting features: {e}")
        raise


def create_sequences(features, time_steps=32):
    output = []
    for i in range(len(features) - time_steps):
        output.append(features[i : (i + time_steps)])
    return np.stack(output)












if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
