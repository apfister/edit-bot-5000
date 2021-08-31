const addExcelGT250Python = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

# get the feature layer we want to add data to
item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

# upload an excel file
excel_file_path = './to_append.xlsx'
excel_item = gis.content.add({ 'title': 'to_append_geojson', 'type': 'Microsoft Excel'}, data=excel_file_path)

# analyze the new excel item
# required for appending an excel or csv file
source_info = gis.content.analyze(item=excel_item)

# append the data
append_res = fl.append(item_id=excel_item.id, upload_format='excel',source_info=source_info, upsert=False)`;

export default addExcelGT250Python;
