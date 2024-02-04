from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
from transformers import pipeline

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze_audio', methods=['POST'])
def analyze_audio():
    audio_data = request.json['audio_data']

    recognizer = sr.Recognizer()
    try:
        text = recognizer.recognize_google(audio_data)
        sentiment, confidence = analyze_sentiment(text)
        return jsonify({'sentiment': sentiment, 'confidence': confidence})
    except sr.UnknownValueError:
        return jsonify({'error': 'Unable to recognize speech'})

def analyze_sentiment(text):
    sentiment_analyzer = pipeline("sentiment-analysis")
    result = sentiment_analyzer(text)

    sentiment = result[0]['label']
    confidence = result[0]['score']

    return sentiment, confidence

if __name__ == '__main__':
    app.run(debug=True)
