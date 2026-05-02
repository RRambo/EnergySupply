import pytest
import sqlite3
import os

TEST_DB = "houses_test.db"


@pytest.fixture(autouse=True)
def setup_db():
    os.environ["DB_PATH"] = TEST_DB

    conn = sqlite3.connect(TEST_DB)
    cursor = conn.cursor()

    cursor.execute("DROP TABLE IF EXISTS houses")

    cursor.execute("""
    CREATE TABLE houses (
        id TEXT PRIMARY KEY,
        solar_p INTEGER,
        people INTEGER,
        heat_pump INTEGER,
        ev INTEGER,
        in_grid BOOLEAN DEFAULT 0
    )
    """)

    cursor.executemany(
        """
        INSERT INTO houses (id, solar_p, people, heat_pump, ev, in_grid)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        [
            ("7", 1, 3, 0, 0, 0),
            ("1", 1, 4, 0, 0, 0),
        ],
    )

    conn.commit()
    conn.close()

    yield

    if os.path.exists(TEST_DB):
        os.remove(TEST_DB)
