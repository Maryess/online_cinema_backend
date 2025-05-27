import sys
import webvtt
import requests

def translate_text(text, source_lang, target_lang):
    try:
      url = "http://localhost:5001/translate"
      payload = {
          "q": text,
          "source": source_lang,
          "target": target_lang,
          "format": "text"
      }
      response = requests.post(url, json=payload)
      response.raise_for_status()
      response.raise_for_status()
      return response.json()["translatedText"]
    except Exception as e:
        raise Exception(f"Ошибка перевода '{text}': {e}")

def translate_vtt(input_path, output_path, target_lang, source_lang="en"):
    captions = webvtt.read(input_path)
    for caption in captions:
        try:
            caption.text = translate_text(caption.text, source_lang, target_lang)
        except Exception as e:
            print(e)
    captions.save(output_path)

if __name__ == "__main__":
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    target_lang = sys.argv[3]
    source_lang = sys.argv[4] if len(sys.argv) > 4 else "en"
    translate_vtt(input_path, output_path, target_lang, source_lang)
