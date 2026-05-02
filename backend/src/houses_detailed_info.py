import random
from src.database import get_all_houses


def generate_house_currents(house_id: str, day: int):
    return {
        "cur_power_gen": round(random.uniform(5, 20), 2),
        "cur_power_cons": round(random.uniform(3, 15), 2),
        "cur_savings": round(random.uniform(0, 5), 2),
        "cur_gains": round(random.uniform(0, 3), 2),
    }


def generate_house_totals(house_id: str):
    return {
        "total_power_gen": round(random.uniform(1000, 5000), 2),
        "total_power_cons": round(random.uniform(800, 4000), 2),
        "total_savings": round(random.uniform(100, 800), 2),
        "total_gains": round(random.uniform(50, 500), 2),
    }


def generate_houses_details():
    houses_rows = get_all_houses()
    house_ids = [h["id"] for h in houses_rows]

    house_totals = {house_id: generate_house_totals(house_id) for house_id in house_ids}

    houses_details = []

    for day in range(1, 366):
        day_entry = {"day": day, "houses": {}}

        for house_id in house_ids:
            day_data = generate_house_currents(house_id, day)
            day_data.update(house_totals[house_id])
            day_entry["houses"][house_id] = day_data

        houses_details.append(day_entry)

    return houses_details
