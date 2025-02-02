import csv
import json
import re

def dms_to_dd(dms_str):
    """
    Konwersja DMS (Degrees°Minutes'Seconds'') string na stopnie dziesiętne.
    """
    dms_str = dms_str.strip().replace("″", "''").replace("’", "'").replace('"', "''")
    dms_regex = re.compile(r"""(?P<degrees>\d+)°\s*(?P<minutes>\d+)'(?P<seconds>\d+)''""")
    match = dms_regex.match(dms_str)
    if not match:
        raise ValueError(f"Nieprawidłowy format DMS: {dms_str}")
    degrees = float(match.group('degrees'))
    minutes = float(match.group('minutes'))
    seconds = float(match.group('seconds'))
    dd = degrees + minutes / 60 + seconds / 3600
    return dd

geojson = {
    "type": "FeatureCollection",
    "features": []
}

with open('stacje_metadane.csv', 'r', encoding='utf-8-sig') as csvfile:  # 'utf-8-sig' to handle BOM
    reader = csv.DictReader(csvfile, delimiter=';')
    for row in reader:
        # Strip
        row = {k.strip(): v.strip() for k, v in row.items()}
        try:
            longitude_dd = dms_to_dd(row['długość_geogr.'])
            latitude_dd = dms_to_dd(row['szerokość_geogr.'])
            
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        longitude_dd,
                        latitude_dd
                    ]
                },
                "properties": {
                    "nazwa stacji": row['nazwa_stacji'],
                    "kod stacji": row['kod_stacji'],
                    "kod 9-znakowy": row['kod_9-znakowy'],
                    "data_od": row['data_od'],
                    "data_do": row['data_do'],
                    "rodzaj stacji": row['rodzaj_stacji'],
                    "rząd danych w CBDH": row['rząd_danych_w_CBDH'],
                    "wysokość [m npm]": float(row['wysokość_[m_npm]']) if row['wysokość_[m_npm]'] else None
                }
            }
            geojson['features'].append(feature)
        except KeyError as e:
            print(f"KeyError: {e}. Dostępne klucze: {list(row.keys())}")
        except ValueError as e:
            print(f"Błąd w wierszu {row.get('nazwa_stacji', 'Unknown')}: {e}")

with open('stacje_synoptyczne_metadata.geojson', 'w', encoding='utf-8') as jsonfile:
    json.dump(geojson, jsonfile, ensure_ascii=False, indent=2)

print("Konwersja udana")
