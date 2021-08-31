const addFGDBPython = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

# upload a FileGDB to ArcGIS Online
fgdb_append_path = './fgdb_to_append.zip'
item_append_fgdb = gis.content.add({'title': 'fgdb_to_append', 'type': 'File Geodatabase'}, data=fgdb_append_path)

fl_to_update_item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = fl_to_update_item.layers[0]

# this is the name of the tbl in the FGDB you uploaded where the features will come from to append
source_table_name = 'Point_layer'

fl.append(item_id=item_append_fgdb.id, upload_format='filegdb', source_table_name=source_table_name, upsert=False)`;

export default addFGDBPython;
