from src.database import get_all_houses
from utils.calculations import calculate_current_consumption
from utils.calculations import calculate_current_generation
from utils.calculations import calculate_house_savings
from day_data import get_daily_data


def generate_houses_details():
    houses = get_all_houses()
    houses_details = []
    total_values = {
        house["id"]: {
            "total_power_gen": 0.0,
            "total_power_cons": 0.0,
            "total_savings": 0.0,
            "total_gains": 0.0
        }
        for house in houses
    }

    for day in range(1, 366):
        daily_data = get_daily_data(day)
        temperature = daily_data["temperature"]
        solar_radiation = daily_data["solar_radiation"]
        current_grid_price = daily_data["current_grid_price"]
        calculated_houses = []

        for house in houses:
            current_generation = calculate_current_generation(house, solar_radiation)
            current_consumption = calculate_current_consumption(house, temperature)

            calculated_houses.append(
                {
                    **house,
                    "current_generation": current_generation,
                    "current_consumption": current_consumption,
                }
            )

        houses_with_savings = calculate_house_savings(calculated_houses, current_grid_price)

        day_entry = {"day": day,"houses": {}}

        for house in houses_with_savings:
            house_id = house["id"]
            total_values[house_id]["total_power_gen"] += house["current_generation"]
            total_values[house_id]["total_power_cons"] += house["current_consumption"]
            total_values[house_id]["total_savings"] += house["current_savings"]
            total_values[house_id]["total_gains"] += house["current_gains"]
            
            day_entry["houses"][house_id] = {
                "cur_power_gen": round(house["current_generation"], 2),
                "cur_power_cons": round(house["current_consumption"], 2),
                "cur_savings": round(house["current_savings"], 2),
                "cur_gains": round(house["current_gains"], 2),
                "total_power_gen": round(total_values[house_id]["total_power_gen"], 2),
                "total_power_cons": round(total_values[house_id]["total_power_cons"], 2),
                "total_savings": round(total_values[house_id]["total_savings"], 2),
                "total_gains": round(total_values[house_id]["total_gains"], 2)
            }

        houses_details.append(day_entry)
    return houses_details