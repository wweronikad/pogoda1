import requests
import json

base_url_hydro_data = "https://danepubliczne.imgw.pl/api/data/hydro/"
base_url_station = "https://hydro-back.imgw.pl/station/hydro/status?id="

print("Fetching hydro station data...")

hydro_data = requests.get(base_url_hydro_data).json()
print(f"Retrieved data for {len(hydro_data)} stations.")

# struktura geojsona
geojson = {
    "type": "FeatureCollection",
    "features": []
}

for station in hydro_data:
    station_id = station.get('id_stacji')
    station_name = station.get('stacja')
    station_url = f"{base_url_station}{station_id}"
    print(f"Fetching coordinates and additional data for station ID: {station_id} ({station_name})...")
    
    try:
        station_details = requests.get(station_url).json()
        coordinates = station_details.get('coordinates')
        status = station_details.get('status', {})

        if coordinates:
            alarm_value = status.get('alarmValue')
            warning_value = status.get('warningValue')
            river_course_km = status.get('riverCourseKm')
            catchment_area = status.get('catchmentArea')

            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [coordinates['x'], coordinates['y']]
                },
                "properties": {
                    "id": station_id,
                    "station_name": station_name,
                    "alarmValue": alarm_value,
                    "warningValue": warning_value,
                    "riverCourseKm": river_course_km,
                    "catchmentArea": catchment_area
                }
            }
            geojson["features"].append(feature)
            print(f"Dodano: {station_id}.")
        else:
            print(f"Nie znaleziono współrzędnych dla stacji o ID: {station_id}.")
    except Exception as e:
        print(f"Nieudane pobieranie dla stacji {station_id}: {e}")

geojson_file_path = "hydro_xy.geojson"
with open(geojson_file_path, "w", encoding='utf-8') as geojson_file:
    json.dump(geojson, geojson_file, ensure_ascii=False, indent=4)

print(f"Utworzono: {geojson_file_path}")
