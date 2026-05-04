import json
from utils.calculations import calculate_grid_state, DEFAULTS
from day_data import get_daily_data
from main import get_all_houses

def load_avg_daily_data(path: str = "backend/data/avg_daily_data.json") -> list[dict]:
    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)

def generate_panel_day(houses: list[dict], solar_radiation: float, temperature: float, config: dict = DEFAULTS,):
    grid_state = calculate_grid_state(houses=houses, solar_radiation=solar_radiation, temperature=temperature, config=config,)
    return {
        "total_generation": round(grid_state["total_generation"], 2),
        "total_consumption": round(grid_state["total_consumption"], 2),
        "net_flow": round(grid_state["net_flow"], 2),
        "current_price": round(grid_state["current_grid_price"], 3),
        "average_price": config["average_german_price"],
    }


def generate_panel_details(config: dict = DEFAULTS,):
    
    daily_data = get_daily_data()
    houses = get_all_houses()
    panel_details = []
    
    for day in range(1, 366):
        weather_day = daily_data.get(day)
        if weather_day is None:
            continue
        solar_radiation = weather_day["solar_irradiation"]
        temperature = weather_day["avg_temp"]
        day_entry = {
            "day": day,
            "panel": generate_panel_day(
                houses=houses,
                solar_radiation=solar_radiation,
                temperature=temperature,
                config=config,
            ),
        }

        panel_details.append(day_entry)

    return panel_details
