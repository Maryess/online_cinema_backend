import sys
import webvtt
import requests
import json
import redis

# Подключение к Redis
r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

def get_cache(key):
    data = r.get(key)
    if data:
        return json.loads(data)
    return None

def set_cache(key, value, ttl=3600):
    r.set(key, json.dumps(value), ex=ttl)

def translate_text(text, source_lang, target_lang):
    cache_key = f"translate:{source_lang}:{target_lang}:{text}"

    cached = get_cache(cache_key)
    if cached:
        print("Из кэша:", text)
        return cached

    url = "http://localhost:5001/translate"
    payload = {
        "q": text,
        "source": source_lang,
        "target": target_lang,
        "format": "text"
    }

    try:
        response = requests.post(url, json=payload, timeout=30)
        response.raise_for_status()
        translated = response.json()["translatedText"]
        set_cache(cache_key, translated)
        return translated
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
