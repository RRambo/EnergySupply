import random


def generate_panel_day(day: int):
    return {
        "total_generation": round(random.uniform(200, 800), 2),
        "total_consumption": round(random.uniform(180, 750), 2),
        "net_flow": round(random.uniform(-200, 200), 2),
        "current_price": round(random.uniform(0.20, 0.45), 2),
        "average_price": round(random.uniform(0.25, 0.40), 2),
    }


def generate_panel_details():
    panel_details = []

    for day in range(1, 366):
        day_entry = {"day": day, "panel": generate_panel_day(day)}

        panel_details.append(day_entry)

    return panel_details
