from flask import Flask , Blueprint, json, jsonify, request
from parser import parse_expression
from code_generator import CodeGenerator

app = Flask(__name__)

@app.route("/")
def home():
    return "GreenHorn traspiler , Hello!"

@app.route("/compile", methods=["POST"])
def compile():

    data = request.json
    code_generator = CodeGenerator(parse_expression(data.get("code")))
    js_code = code_generator.generate_code()
    processed_data = {"ok":True, "output": js_code}
    return jsonify(processed_data)

@app.route("/save",methods=["POST"])
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
        return jsonify({"error": "Error trying to retreive the keywords"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
