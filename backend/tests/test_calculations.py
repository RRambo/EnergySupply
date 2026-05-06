import pytest

from src.utils.calculations import (
    DEFAULTS,
    clamp,
    calculate_current_generation,
    calculate_person_consumption,
    calculate_ev_consumption,
    calculate_heat_pump_consumption,
    calculate_current_consumption,
    calculate_grid_totals,
    calculate_net_flow,
    calculate_current_price,
    calculate_house_savings,
    calculate_grid_state,
)


def test_clamp_value_inside_range():
    assert clamp(5, 0, 10) == 5


def test_clamp_value_below_minimum():
    assert clamp(-5, 0, 10) == 0


def test_clamp_value_above_maximum():
    assert clamp(15, 0, 10) == 10


def test_calculate_current_generation_without_solar():
    house = {"has_solar": 0}

    result = calculate_current_generation(house, solar_radiation=5)

    assert result == 0.0


def test_calculate_current_generation_with_solar():
    house = {"has_solar": 1}

    result = calculate_current_generation(house, solar_radiation=5)

    assert result == 5 * DEFAULTS["installed_power_kwp"] * DEFAULTS["performance_ratio"]


def test_calculate_person_consumption():
    result = calculate_person_consumption(persons=3)

    assert result == 3 * DEFAULTS["consumption_per_person_per_day"]


def test_calculate_ev_consumption_normal_temperature():
    result = calculate_ev_consumption(ev_count=2, temperature=10)

    assert result == 2 * DEFAULTS["ev_consumption_per_day"]


def test_calculate_ev_consumption_cold_temperature():
    result = calculate_ev_consumption(ev_count=1, temperature=0)

    expected_factor = 1 + (DEFAULTS["ev_cold_threshold"] - 0) * DEFAULTS["ev_cold_increase_per_degree"]
    expected = DEFAULTS["ev_consumption_per_day"] * expected_factor

    assert result == pytest.approx(expected)


def test_calculate_heat_pump_consumption_without_heat_pump():
    result = calculate_heat_pump_consumption(has_heat_pump=False, temperature=0)

    assert result == 0.0


def test_calculate_heat_pump_consumption_warm_temperature():
    result = calculate_heat_pump_consumption(has_heat_pump=True, temperature=20)

    assert result == 0.0


def test_calculate_heat_pump_consumption_cold_temperature():
    result = calculate_heat_pump_consumption(has_heat_pump=True, temperature=10)

    expected = (DEFAULTS["heat_pump_threshold"] - 10) * DEFAULTS["heat_pump_base_per_degree"]

    assert result == expected


def test_calculate_current_consumption():
    house = {
        "persons": 2,
        "ev_count": 1,
        "has_heat_pump": True,
    }

    result = calculate_current_consumption(house, temperature=10)

    expected_persons = 2 * DEFAULTS["consumption_per_person_per_day"]
    expected_ev = DEFAULTS["ev_consumption_per_day"]
    expected_heat_pump = (DEFAULTS["heat_pump_threshold"] - 10) * DEFAULTS["heat_pump_base_per_degree"]

    assert result == pytest.approx(expected_persons + expected_ev + expected_heat_pump)


def test_calculate_grid_totals_only_part_of_grid():
    houses = [
        {
            "id": "1",
            "part_of_grid": True,
            "current_generation": 10,
            "current_consumption": 5,
        },
        {
            "id": "2",
            "part_of_grid": False,
            "current_generation": 100,
            "current_consumption": 100,
        },
        {
            "id": "3",
            "part_of_grid": True,
            "current_generation": 3,
            "current_consumption": 7,
        },
    ]

    result = calculate_grid_totals(houses)

    assert result["total_generation"] == 13
    assert result["total_consumption"] == 12


def test_calculate_net_flow_surplus():
    assert calculate_net_flow(total_generation=20, total_consumption=10) == 10


def test_calculate_net_flow_deficit():
    assert calculate_net_flow(total_generation=5, total_consumption=10) == -5


def test_calculate_current_price_when_no_consumption():
    result = calculate_current_price(net_flow=10, total_consumption=0)

    assert result == DEFAULTS["min_grid_price"]


def test_calculate_current_price_with_surplus_gets_cheaper():
    result = calculate_current_price(net_flow=10, total_consumption=20)

    expected = DEFAULTS["base_grid_price"] * (
        1 - DEFAULTS["price_sensitivity"] * (10 / 20)
    )

    assert result == pytest.approx(expected)


def test_calculate_current_price_with_deficit_gets_more_expensive():
    result = calculate_current_price(net_flow=-10, total_consumption=20)

    expected = DEFAULTS["base_grid_price"] * (
        1 - DEFAULTS["price_sensitivity"] * (-10 / 20)
    )

    assert result == pytest.approx(expected)


def test_calculate_current_price_respects_min_price():
    result = calculate_current_price(net_flow=1000, total_consumption=1)

    assert result == DEFAULTS["min_grid_price"]


def test_calculate_current_price_respects_max_price():
    result = calculate_current_price(net_flow=-1000, total_consumption=1)

    assert result == DEFAULTS["max_grid_price"]


def test_calculate_house_savings_for_house_without_solar():
    houses = [
        {
            "id": "solar-house",
            "has_solar": 1,
            "part_of_grid": True,
            "current_generation": 10,
            "current_consumption": 4,
        },
        {
            "id": "consumer-house",
            "has_solar": 0,
            "part_of_grid": True,
            "current_generation": 0,
            "current_consumption": 6,
        },
    ]

    result = calculate_house_savings(houses, current_grid_price=0.10)

    consumer_house = next(house for house in result if house["id"] == "consumer-house")

    assert consumer_house["local_energy_received"] == 6
    assert consumer_house["external_energy_needed"] == 0
    assert consumer_house["normal_cost"] == pytest.approx(6 * 0.40)
    assert consumer_house["local_grid_cost"] == pytest.approx(6 * 0.10)
    assert consumer_house["current_savings"] == pytest.approx((6 * 0.40) - (6 * 0.10))
    assert consumer_house["current_gains"] == 0.0


def test_calculate_house_savings_for_house_with_solar():
    houses = [
        {
            "id": "solar-house",
            "has_solar": 1,
            "part_of_grid": True,
            "current_generation": 10,
            "current_consumption": 4,
        }
    ]

    result = calculate_house_savings(houses, current_grid_price=0.10)

    solar_house = result[0]

    assert solar_house["self_used_solar"] == 4
    assert solar_house["surplus_solar"] == 6
    assert solar_house["remaining_demand"] == 0
    assert solar_house["current_savings"] == 0.0
    assert solar_house["current_gains"] == pytest.approx(6 * 0.10)


def test_calculate_house_savings_ignores_houses_not_part_of_grid():
    houses = [
        {
            "id": "grid-house",
            "has_solar": 0,
            "part_of_grid": True,
            "current_generation": 0,
            "current_consumption": 5,
        },
        {
            "id": "non-grid-house",
            "has_solar": 0,
            "part_of_grid": False,
            "current_generation": 0,
            "current_consumption": 100,
        },
    ]

    result = calculate_house_savings(houses, current_grid_price=0.10)

    assert len(result) == 1
    assert result[0]["id"] == "grid-house"


def test_calculate_grid_state():
    houses = [
        {
            "id": "1",
            "has_solar": 1,
            "part_of_grid": True,
            "persons": 2,
            "ev_count": 0,
            "has_heat_pump": False,
        },
        {
            "id": "2",
            "has_solar": 0,
            "part_of_grid": True,
            "persons": 1,
            "ev_count": 0,
            "has_heat_pump": False,
        },
    ]

    result = calculate_grid_state(
        houses=houses,
        solar_radiation=5,
        temperature=20,
    )

    expected_generation = 5 * DEFAULTS["installed_power_kwp"] * DEFAULTS["performance_ratio"]
    expected_consumption = 3 * DEFAULTS["consumption_per_person_per_day"]
    expected_net_flow = expected_generation - expected_consumption

    assert result["total_generation"] == pytest.approx(expected_generation)
    assert result["total_consumption"] == pytest.approx(expected_consumption)
    assert result["net_flow"] == pytest.approx(expected_net_flow)
    assert "current_grid_price" in result