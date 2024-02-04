import torch
from transformers import MarianMTModel, MarianTokenizer
# Use a pipeline as a high-level helper
from transformers import pipeline
# Load model directly
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

tokenizer = AutoTokenizer.from_pretrained("facebook/nllb-200-distilled-1.3B")
model = AutoModelForSeq2SeqLM.from_pretrained("facebook/nllb-200-distilled-1.3B")

pipe = pipeline("translation", model="facebook/nllb-200-distilled-1.3B")
def load_translation_model(model_name):
    model = MarianMTModel.from_pretrained(model_name)
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    return model, tokenizer

def translate_text(model, tokenizer, text, target_language="en"):
    input_ids = tokenizer.encode(text, return_tensors="pt")
    translated_ids = model.generate(input_ids, max_length=128, num_beams=4, no_repeat_ngram_size=2, to=language_code)
    translated_text = tokenizer.decode(translated_ids[0], skip_special_tokens=True)
    return translated_text

def main():
    # Replace 'Helsinki-NLP/opus-mt-en-fr' with the desired translation model for your target language
    translation_model, translation_tokenizer = load_translation_model('facebook/nllb-200-distilled-1.3B')

    # Example conversation
    user_texts = [""]

    for user_text in user_texts:
        # Assuming the user's text is in their native language
        source_language = detect_language(user_text)  # Implement language detection logic
        translated_text = translate_text(translation_model, translation_tokenizer, user_text, target_language="en")
        
        # Display or send the translated text
        print(f"User ({source_language}): {user_text}")
        print(f"Translated ({target_language}): {translated_text}\n")

if __name__ == "__main__":
    main()
