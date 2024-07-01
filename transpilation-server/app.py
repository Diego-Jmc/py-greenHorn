import time

from flask import Flask,json, jsonify, request
from flask_cors import CORS
from parser import parse_expression
from code_generator import CodeGenerator

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "GreenHorn transpiler , Hello!"


@app.route("/compile", methods=["POST"])
def compile():
    start_time = time.time_ns()
    data = request.json
    output = ""
    ok = False

    try:
        code_generator = CodeGenerator(parse_expression(data.get("code")))
        output = code_generator.generate_code()
        time.sleep(2)
        ok = True
    except SyntaxError as e:
        output = str(e)

    end_time = time.time_ns()
    duration_ns = end_time - start_time

    processed_data = {"ok": ok, "output": output, "duration_ns": duration_ns}

    return jsonify(processed_data)


@app.route("/save", methods=["POST"])
def save():
    data = request.json

    processed_data = {"message": "/save method working", "data": data}

    return jsonify(processed_data)


@app.route("/keywords")
def keywords():
    json_file = './keywords.json'
    try:
        with open(json_file, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Error trying to retrieve the keywords"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run()
