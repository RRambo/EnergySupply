from src.houses_detailed_info import generate_houses_details


def test_result_length():
    result = generate_houses_details()
    assert len(result) == 365


def test_result_structure():
    result = generate_houses_details()
    day0 = result[0]
    assert "day" in day0
    assert "houses" in day0


def test_house_count():
    result = generate_houses_details()
    day0 = result[0]
    assert len(day0["houses"]) == 23


from src.panel_info import generate_panel_details


def test_panel_result_length():
    result = generate_panel_details()
    assert len(result) == 365


def test_panel_structure():
    result = generate_panel_details()
    day0 = result[0]
    assert "day" in day0
    assert "panel" in day0
