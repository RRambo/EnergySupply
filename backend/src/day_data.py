import json
from datetime import datetime
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PATH = os.path.join(BASE_DIR, "data", "avg_daily_data.json")

_cached_data = None


def get_daily_data():
    global _cached_data

    if _cached_data is not None:
        return _cached_data

    result = {}
    with open(PATH, encoding="utf-8") as f:
        data = json.load(f)

    for entry in data:
        date_obj = datetime.strptime(f"2021-{entry['day']}", "%Y-%m-%d")
        day_of_year = date_obj.timetuple().tm_yday

        result[day_of_year] = {
            "day": day_of_year,
            "solar_irradiation": entry.get("G(i)"),
            "avg_temp": entry.get("avg_temp"),
        }

    _cached_data = result
    return result
