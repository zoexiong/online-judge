from flask import Flask
from flask import request
from flask import jsonify
import json

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/build_and_run", methods=["POST"])
def build_and_run():
    #type of request.data is string, we need to load it as JSON
    data = json.loads(request.data)
    print('request',request)
    print('data',data)

    if 'code' not in data or 'lang' not in data:
        return "Both 'code' and 'lang' should be provided"
    code = data['code']
    lang = data['lang']

    print("API got called with code: %s in %s" % (code, lang))

    return jsonify({"hello": "world!"})

if __name__ == "__main__":
    app.run(debug=True)