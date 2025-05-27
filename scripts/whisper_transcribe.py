import sys
import whisper

def format_time(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    milliseconds = int((seconds % 1) * 1000)
    return f"{hours:02}:{minutes:02}:{secs:02}.{milliseconds:03}"
    
if len(sys.argv) != 3:
    print("Usage: whisper_transcribe.py input_audio_path output_vtt_path")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]

model = whisper.load_model("base")
result = model.transcribe(input_path)

with open(output_path, "w", encoding="utf-8") as f:
    f.write("WEBVTT\n\n")
    for i, segment in enumerate(result["segments"]):
        start = format_time(segment["start"])
        end = format_time(segment["end"])
        text = segment["text"].strip()
        f.write(f"{i+1}\n{start} --> {end}\n{text}\n\n")
        


