
import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "noira.db")

connection = sqlite3.connect(db_path)
cursor = connection.cursor()

cursor.execute("SELECT * FROM messages")
messages = cursor.fetchall()

if messages:
    for msg in messages:
        print("\n----------------------------")
        print("Message ID:", msg[0])
        print("Name:", msg[1])
        print("Email:", msg[2])
        print("Subject:", msg[3])
        print("Message:", msg[4])
else:
    print("No messages found.")

connection.close()
