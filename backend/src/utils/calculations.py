from typing import List, Dict, Any


DEFAULTS = {
    "installed_power_kwp": 8,
    "performance_ratio": 0.8,
    "installed_power_kwp": 5,
    "average_german_price": 0.40,
    "base_grid_price": 0.30,
    "min_grid_price": 0.08,
    "max_grid_price": 0.50,
    "price_sensitivity": 0.5,

    "consumption_per_person_per_day": 4.1,
    "ev_consumption_per_day": 6.25,
    "ev_cold_threshold": 5,
    "ev_cold_increase_per_degree": 0.02,

    "heat_pump_threshold": 15,
    "heat_pump_base_per_degree": 0.8
}


def clamp(value: float, min_value: float, max_value: float) -> float:
    return min(max(value, min_value), max_value)


def calculate_current_generation(house: Dict[str, Any], solar_radiation: float, config: Dict[str, Any] = DEFAULTS) -> float:
    if not house.get("has_solar", False):
        return 0.0

    return solar_radiation * config["installed_power_kwp"] * config["performance_ratio"]


def calculate_person_consumption(persons: int, config: Dict[str, Any] = DEFAULTS) -> float:
    return persons * config["consumption_per_person_per_day"]


def calculate_ev_consumption(ev_count: int, temperature: float, config: Dict[str, Any] = DEFAULTS) -> float:
    temperature_factor = (
        1
        + max(0, config["ev_cold_threshold"] - temperature)
        * config["ev_cold_increase_per_degree"]
    )

    return ev_count * config["ev_consumption_per_day"] * temperature_factor


def calculate_heat_pump_consumption(has_heat_pump: bool, temperature: float, config: Dict[str, Any] = DEFAULTS) -> float:
    if not has_heat_pump:
        return 0.0

    return (
        max(0, config["heat_pump_threshold"] - temperature)
        * config["heat_pump_base_per_degree"]
    )


def calculate_current_consumption(house: Dict[str, Any], temperature: float, config: Dict[str, Any] = DEFAULTS) -> Dict[str, float]:
    person_consumption = calculate_person_consumption(
        house.get("persons", 0),
        config
    )

    ev_consumption = calculate_ev_consumption(
        house.get("ev_count", 0),
        temperature,
        config
    )

    heat_pump_consumption = calculate_heat_pump_consumption(
        house.get("has_heat_pump", False),
        temperature,
        config
    )

    return  person_consumption + ev_consumption + heat_pump_consumption


def calculate_grid_totals(houses: List[Dict[str, Any]]) -> Dict[str, float]:
    total_generation = 0.0
    total_consumption = 0.0

    for house in houses:
        if not house.get("part_of_grid", True):
            continue

        total_generation += house.get("current_generation", 0)
        total_consumption += house.get("current_consumption", 0)

    return {
        "total_generation": total_generation,
        "total_consumption": total_consumption
    }


def calculate_net_flow(total_generation: float, total_consumption: float) -> float:
    return total_generation - total_consumption


def calculate_current_price(net_flow: float, total_consumption: float, config: Dict[str, Any] = DEFAULTS) -> float:
    if total_consumption <= 0:
        return config["min_grid_price"]

    net_flow_ratio = net_flow / total_consumption

    raw_price = (
        config["base_grid_price"]
        * (1 - config["price_sensitivity"] * net_flow_ratio)
    )

    return clamp(
        raw_price,
        config["min_grid_price"],
        config["max_grid_price"]
    )


def calculate_house_savings(houses: List[Dict[str, Any]], current_grid_price: float, config: Dict[str, Any] = DEFAULTS) -> List[Dict[str, Any]]:
    grid_houses = [
        house for house in houses
        if house.get("part_of_grid", True)
    ]

    prepared_houses = []

    for house in grid_houses:
        current_generation = house.get("current_generation", 0)
        current_consumption = house.get("current_consumption", 0)

        self_used_solar = min(current_generation, current_consumption)
        surplus_solar = max(0, current_generation - current_consumption)
        remaining_demand = max(0, current_consumption - current_generation)

        prepared_houses.append({
            **house,
            "self_used_solar": self_used_solar,
            "surplus_solar": surplus_solar,
            "remaining_demand": remaining_demand
        })

    total_surplus = sum(house["surplus_solar"] for house in prepared_houses)
    total_remaining_demand = sum(
        house["remaining_demand"] for house in prepared_houses
    )

    available_local_energy = min(total_surplus, total_remaining_demand)

    result = []

    for house in prepared_houses:
        if total_remaining_demand > 0:
            local_energy_received = (
                house["remaining_demand"]
                / total_remaining_demand
                * available_local_energy
            )
        else:
            local_energy_received = 0.0

        external_energy_needed = (
            house["remaining_demand"] - local_energy_received
        )

        normal_cost = (
            house["current_consumption"]
            * config["average_german_price"]
        )

        local_grid_cost = (
            local_energy_received * current_grid_price
            + external_energy_needed * config["average_german_price"]
        )

        current_savings = normal_cost - local_grid_cost

        current_gains = house["surplus_solar"] * current_grid_price

        result.append({
            **house,
            "local_energy_received": local_energy_received,
            "external_energy_needed": external_energy_needed,
            "normal_cost": normal_cost,
            "local_grid_cost": local_grid_cost,
            "current_savings": current_savings,
            "current_gains": current_gains
        })

    return result


def calculate_grid_state(houses: List[Dict[str, Any]], solar_radiation: float, temperature: float, config: Dict[str, Any] = DEFAULTS) -> Dict[str, Any]:
    calculated_houses = []

    for house in houses:
        current_generation = calculate_current_generation(
            house,
            solar_radiation,
            config
        )

        consumption_details = calculate_current_consumption(
            house,
            temperature,
            config
        )

        calculated_houses.append({
            **house,
            "current_generation": current_generation,
            "current_consumption": consumption_details["total_consumption"],
            "consumption_details": consumption_details
        })

    totals = calculate_grid_totals(calculated_houses)

    net_flow = calculate_net_flow(
        totals["total_generation"],
        totals["total_consumption"]
    )

    current_grid_price = calculate_current_price(
        net_flow,
        totals["total_consumption"],
        config
    )

    houses_with_savings = calculate_house_savings(
        calculated_houses,
        current_grid_price,
        config
    )

    return {
        "houses": houses_with_savings,
        "total_generation": totals["total_generation"],
        "total_consumption": totals["total_consumption"],
        "net_flow": net_flow,
        "current_grid_price": current_grid_price
    }