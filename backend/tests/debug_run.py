from src.panel_info import generate_panel_details
from src.houses_detailed_info import generate_houses_details

result = generate_houses_details(True)

print("Fertig, Anzahl Tage:", len(result))
print(result)
