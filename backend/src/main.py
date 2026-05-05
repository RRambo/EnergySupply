from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from src.database import update_grid_status, get_all_houses
from src.houses_detailed_info import generate_houses_details
from src.panel_info import generate_panel_details

app = FastAPI()  # start with:  uvicorn src.main:app --reload


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GridUpdate(BaseModel):
    id: str = Field(json_schema_extra={"example": "7"})
    in_grid: bool = Field(json_schema_extra={"example": True})


@app.get("/")
def root():
    return {"message": "Backend is working"}


@app.get("/houses")
def get_houses():
    return get_all_houses()


@app.get("/houses-details")
def get_houses_details():
    return generate_houses_details(only_savings_gains=False)


@app.get("/panel-details")
def get_panel_details():
    return generate_panel_details()


@app.get("/savings-gains")
def get_savings_gains_details():
    return generate_houses_details(only_savings_gains=True)


@app.post("/update-grid")  # needs {"id": "7", "in_grid": true}
def update_grid(data: GridUpdate):
    success = update_grid_status(data.id, data.in_grid)

    if not success:
        raise HTTPException(status_code=404, detail="House not found")

    return {
        "message": "Grid status updated",
        "id": data.id,
        "in_grid": data.in_grid,
    }


# frontend
# POST
# GET /savings-gains
# GET /panel-details
