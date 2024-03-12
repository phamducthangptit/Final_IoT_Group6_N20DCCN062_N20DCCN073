from flask import Flask, request, jsonify
from flask_cors import CORS
from url_check import detection_url

app = Flask(__name__)
CORS(app)

@app.route("/predict_url", methods=['POST'])
def predict_url():
    data = request.json # lay url ve
    url = data.get('url', '')
    print(url)
    pred = detection_url(url)
    print(pred)
    data = {"predict" : pred}
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=int("3001"), debug=True)