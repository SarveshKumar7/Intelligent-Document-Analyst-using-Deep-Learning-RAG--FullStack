import os
from flask import Flask, request, jsonify
from .supabase_client import supabase

app = Flask(__name__)


@app.route("/api/verify", methods=["GET"])
def verify():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return jsonify({"error": "Missing Bearer token"}), 401
    token = auth.split(" ", 1)[1]
    # Try multiple client methods depending on supabase-py version
    user = None
    try:
        user = supabase.auth.get_user(token)
    except Exception:
        try:
            user = supabase.auth.api.get_user(token)
        except Exception as e:
            return jsonify({"error": str(e)}), 401

    return jsonify({"user": user}), 200


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
