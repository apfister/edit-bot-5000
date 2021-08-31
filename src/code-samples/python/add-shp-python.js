const addShpPython = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

# get the feature layer we want to add data to
item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

# upload a shapefile
shp_append_path = './to_append_shp.zip'
item_append_shp = gis.content.add({'title': 'shp_to_append', 'type': 'Shapefile'}, data=shp_append_path)

# append the data
append_res = fl.append(item_id=item_append_shp.id, upload_format='shapefile', upsert=False)`;

export default addShpPython;
