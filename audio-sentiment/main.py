import speech_recognition as sr
from transformers import pipeline

def transcribe_audio_from_microphone():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Say something...")
        recognizer.adjust_for_ambient_noise(source)
        audio_data = recognizer.listen(source, timeout=10)

    try:
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio.")
        return None
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")
        return None

def analyze_sentiment(text):
    sentiment_analyzer = pipeline("sentiment-analysis")
    result = sentiment_analyzer(text)
    return result[0]['label'], result[0]['score']

if __name__ == "__main__":
    # Step 1: Transcribe live audio from the microphone
    transcribed_text = transcribe_audio_from_microphone()

    if transcribed_text:
        print("Transcribed Text:", transcribed_text)

        # Step 2: Analyze sentiment from the transcribed text
        sentiment_label, sentiment_score = analyze_sentiment(transcribed_text)

        print("Sentiment Analysis:")
        print(f"Label: {sentiment_label}")
        print(f"Score: {sentiment_score}")
    else:
        print("No transcribed text. Please check your microphone.")
