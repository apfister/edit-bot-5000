const addGeoJSONLT250Python = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

# get the feature layer we want to add data to
item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

# make some sample features in GeoJSON format
geojson_features = []
for i in range(0, 50):
    geojson_features.append(
        {
            'properties': {
                'STATE': f'NewStateOfAdam__{i}'
            },
            'coordinates': [0,0]
        }
    )

# helper function to convert geojson to esri json
def convert_geojson_to_esrijson(geojson_features):
    features = []
    for f in geojson_features:
        attributes = {}
        for att in f['properties']:
            attributes[att] = f['properties'][att]
            
        features.append({
            'attributes': attributes,
            'geometry': {
                'x': f['coordinates'][0],
                'y': f['coordinates'][1]
            }
        })
    
    return features

# convert geojson to esrijson
converted_geojson = convert_geojson_to_esrijson(geojson_features)

# add the features
edit_res = fl.edit_features(adds=converted_geojson)`;

export default addGeoJSONLT250Python;
