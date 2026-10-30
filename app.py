
from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__)

# Project folder location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Database connection
def get_db_connection():
    connection = sqlite3.connect(
        os.path.join(BASE_DIR, "noira.db")
    )
    connection.row_factory = sqlite3.Row
    return connection


# Create database and contact table
def create_database():
    connection = get_db_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


# Home page
@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


# Open other website pages and JavaScript file
@app.route("/<path:filename>")
def website_files(filename):
    return send_from_directory(BASE_DIR, filename)


# Contact form backend
@app.route("/api/contact", methods=["POST"])
def contact():

    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    subject = request.form.get("subject", "").strip()
    message = request.form.get("message", "").strip()

    if not all([name, email, subject, message]):
        return jsonify({
            "success": False,
            "message": "Please fill all the fields."
        }), 400

    connection = get_db_connection()

    connection.execute("""
        INSERT INTO messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    """, (name, email, subject, message))

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Your message has been saved successfully!"
    })


# Start server
if __name__ == "__main__":
    create_database()

    app.run(debug=True)
