import os

os.environ["DB_PATH"] = "houses_test.db"

from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)


def test_get_houses():
    response = client.get("/houses")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_houses_details():
    response = client.get("/houses-details")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_panel_details():
    response = client.get("/panel-details")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_grid():
    response = client.post("/update-grid", json={"id": "7", "in_grid": True})
    assert response.status_code == 200
    assert response.json()["message"] == "Grid status updated"
    assert response.json()["id"] == "7"
    assert response.json()["in_grid"] == True

    response = client.post("/update-grid", json={"id": "7", "in_grid": False})
    assert response.status_code == 200
    assert response.json()["message"] == "Grid status updated"
    assert response.json()["id"] == "7"
    assert response.json()["in_grid"] == False


def test_update_grid_missing_field():
    payload = {"id": "7"}
    response = client.post("/update-grid", json=payload)
    assert response.status_code == 422
