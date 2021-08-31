const addCSVGT250Python = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

# get the feature layer we want to add data to
item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

# upload an csv file
csv_append_path = './to_append.csv'
item_append_csv = gis.content.add({'title': 'csv_to_append', 'type': 'CSV'}, data=csv_append_path)

# analyze the new csv item
# required for appending an excel or csv file
source_info = gis.content.analyze(item=item_append_csv)

# append the data
append_res = fl.append(item_id=item_append_csv.id, upload_format='csv', source_info=source_info, upsert=False)`;

export default addCSVGT250Python;
