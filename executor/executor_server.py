from flask import Flask
from flask import request
from flask import jsonify
import sys
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
    # get port from command arguments
    port = int(sys.argv[1])
    print("Executor running on: %d" % port)
    app.run(debug=True, port=port)
    # use app.run(debug=True, threaded=True) to avoid