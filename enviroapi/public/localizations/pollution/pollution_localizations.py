import requests
import json

def fetch_pollution_stations_data():
    url = 'https://api.gios.gov.pl/pjp-api/rest/station/findAll'
    try:
        response = requests.get(url)
        response.raise_for_status()  # wyjątek http error
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching station data: {e}")
        return []

def create_geojson(stations_data):
    features = []

    for station in stations_data:
        try:
            lat = float(station['gegrLat'])
            lon = float(station['gegrLon'])
            station_id = station['id']
            station_name = station.get('stationName', 'Unknown')

            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [lon, lat]
                },
                "properties": {
                    "id": station_id,
                    "name": station_name
                }
            }
            features.append(feature)
        except (ValueError, KeyError) as e:
            print(f"Error processing station {station}: {e}")

    geojson_data = {
        "type": "FeatureCollection",
        "features": features
    }

    return geojson_data

def save_geojson(geojson_data, filename='pollution_xy.geojson'):
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            json.dump(geojson_data, file, ensure_ascii=False, indent=4)
        print(f"Zapisano {filename}")
    except IOError as e:
        print(f"Nie udało się zapisać: {e}")

def main():
    stations_data = fetch_pollution_stations_data()
    geojson_data = create_geojson(stations_data)
    save_geojson(geojson_data)

if __name__ == '__main__':
    main()
