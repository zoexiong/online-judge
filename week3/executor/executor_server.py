from flask import Flask
from flask import request
from flask import jsonify
import json
import executor_utils as eu

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/build_and_run", methods=["POST"])
def build_and_run():
    #type of request.data is string, we need to load it as JSON
    data = json.loads(request.data)
    # print('request',request)
    # print('data',data)

    if 'code' not in data or 'lang' not in data:
        return "Both 'code' and 'lang' should be provided"
    code = data['code']
    lang = data['lang']

    print("API got called with code: %s in %s" % (code, lang))

    result = eu.build_and_run(code, lang)

    # result is a dict, need to output as JSON to avoid error "dict is not callable"
    return jsonify(result)

if __name__ == "__main__":
    eu.load_image()
    app.run(debug=True)
    # use app.run(debug=True, threaded=True) to avoid