import sqlite3
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "houses.db")


def create_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS houses (
        id TEXT PRIMARY KEY,
        solar_p INTEGER,
        people INTEGER,
        heat_pump INTEGER,
        ev INTEGER,
        in_grid BOOLEAN DEFAULT 0
    )
    """)

    conn.commit()
    conn.close()


def initial_data():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    with open("backend/data/houses.json") as f:
        houses = json.load(f)

    for h in houses:
        cursor.execute(
            """
        INSERT OR IGNORE INTO houses (id, solar_p, people, heat_pump, ev)
        VALUES (?, ?, ?, ?, ?)
        """,
            (h["id"], h["solar_p"], h["people"], h["heat_pump"], h["ev"]),
        )

    conn.commit()
    conn.close()


def update_grid_status(
    house_id: str, in_grid: bool
):  # needs {"house_id": 7, "in_grid": True}
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE houses SET in_grid = ? WHERE id = ?", (int(in_grid), house_id)
    )

    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return False

    conn.close()
    return True


def get_all_houses():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT id, solar_p, people, heat_pump, ev, in_grid FROM houses")
    rows = cursor.fetchall()

    conn.close()

    response = []
    for id, solar_p, people, heat_pump, ev, in_grid in rows:
        response.append(
            {
                "id": id,
                "solar_p": solar_p,
                "people": people,
                "heat_pump": heat_pump,
                "ev": ev,
                "in_grid": bool(in_grid),
            }
        )
    return response
