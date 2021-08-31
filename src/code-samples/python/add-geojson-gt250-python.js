const addGeoJSONGT250Python = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

# get the feature layer we want to add data to
item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

# upload a geojson file
geojson_file_path = './to_append.geojson'
geojson_item = gis.content.add({ 'title': 'to_append_geojson', 'type': 'GeoJson'}, data=geojson_file_path)

append_res = fl.append(item_id=geojson_item.id, upload_format='geojson', upsert=False)`;

export default addGeoJSONGT250Python;
