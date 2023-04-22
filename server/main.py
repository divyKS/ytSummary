from flask import Flask, request, json
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
from flask_cors import CORS
import config
import openai, os
import spacy
nlp = spacy.load('en_core_web_sm')
app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv('OPENAI_API_KEY')

class Summarizer:
    def __init__(self, text) -> None:
        self.text = text

    def getSummary(self) -> str:
        summarizer = pipeline("summarization", model="stevhliu/my_awesome_billsum_model")
        return summarizer(self.text)[0]['summary_text']
    
    def ask_gpt(self, model_engine="text-davinci-002"):
        response = openai.Completion.create(
            engine=model_engine,
            prompt=f"generate summary for the below video transcript:\n{self.text}",
            n=1,
            temperature=0.7,
            max_tokens=300
        )
        # print(response)
        answer = response.choices[0].text.strip()
        return answer
        

@app.route('/getsummary', methods=['POST'])
def getSummary():
    req = request.get_json()
    vid_id = req['vid_id']
    data = YouTubeTranscriptApi.get_transcript(vid_id)

    transcript = ""
    for obj in data:
        transcript += obj['text'] + " "

    transcript = transcript.replace('\n', ' ')
    transcript = transcript[0:10000]

    return Summarizer(transcript).getSummary()

@app.route('/getsummarygpt', methods=['POST'])
def getSummaryGPT():
    req = request.get_json()
    vid_id = req['vid_id']
    data = YouTubeTranscriptApi.get_transcript(vid_id)

    transcript = ""
    for obj in data:
        transcript += obj['text'] + " "

    doc = nlp(transcript)
    txt = doc[0:1990]
    print(txt.text)
    return Summarizer(txt.text).ask_gpt().replace('\n', " ")


@app.route('/')
def main():
    return "Server is running 🚀🚀"

while True:
    app.run(debug=True)