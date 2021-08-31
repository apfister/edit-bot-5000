const deleteGT500Python = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

fl_to_update_item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = fl_to_update_item.layers[0]

attach_only = False
t_res = fl.manager.truncate(attachment_only=attach_only, wait=True)`;

export default deleteGT500Python;
