"""
Cloud Notes App - Flask REST API
Beginner-friendly backend with SQLite storage.
"""

import os
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend (different port) to call this API

DB_PATH = os.environ.get("DATABASE_PATH", "database.db")


def get_db_connection():
    """Open a connection to the SQLite database."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Return rows as dict-like objects
    return conn


def init_db():
    """Create the notes table if it does not exist."""
    conn = get_db_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.commit()
    conn.close()


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint for Docker/Kubernetes."""
    return jsonify({"status": "ok"})


@app.route("/notes", methods=["GET"])
def get_notes():
    """Return all notes, newest first."""
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT id, title, content, created_at FROM notes ORDER BY id DESC"
    ).fetchall()
    conn.close()
    notes = [dict(row) for row in rows]
    return jsonify(notes)


@app.route("/notes", methods=["POST"])
def create_note():
    """Create a new note from JSON body: { title, content }."""
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()

    if not title or not content:
        return jsonify({"error": "title and content are required"}), 400

    conn = get_db_connection()
    cursor = conn.execute(
        "INSERT INTO notes (title, content) VALUES (?, ?)",
        (title, content),
    )
    conn.commit()
    note_id = cursor.lastrowid
    row = conn.execute(
        "SELECT id, title, content, created_at FROM notes WHERE id = ?",
        (note_id,),
    ).fetchone()
    conn.close()
    return jsonify(dict(row)), 201


@app.route("/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    """Update an existing note: { title, content }."""
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()

    if not title or not content:
        return jsonify({"error": "title and content are required"}), 400

    conn = get_db_connection()
    cursor = conn.execute(
        "UPDATE notes SET title = ?, content = ? WHERE id = ?",
        (title, content, note_id),
    )
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"error": "note not found"}), 404

    row = conn.execute(
        "SELECT id, title, content, created_at FROM notes WHERE id = ?",
        (note_id,),
    ).fetchone()
    conn.close()
    return jsonify(dict(row))


@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    """Delete a note by ID."""
    conn = get_db_connection()
    cursor = conn.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({"error": "note not found"}), 404

    return jsonify({"message": "note deleted", "id": note_id})


if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", 5000))
    # FLASK_DEBUG=1 enables auto-reload when you change app.py (local dev)
    debug = os.environ.get("FLASK_DEBUG", "1") == "1"
    app.run(host="0.0.0.0", port=port, debug=debug, use_reloader=debug)
