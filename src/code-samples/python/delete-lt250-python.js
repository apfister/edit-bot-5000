const deleteLT500Python = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

fl_to_update_item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = fl_to_update_item.layers[0]

##########################
# \`edit_features\` requires a list of features to delete
##########################

# delete by passing in an array of Object IDs
delete_oids = [1,2,3,4]
fl.edit_features(deletes=delete_oids)

##########################
# \`delete_features\` offers more control over what features are deleted
##########################

where_clause = "STATE = 'Wisconsin'"
fl.delete_features(where=where_clause)

# https://developers.arcgis.com/python/api-reference/arcgis.geometry.filters.html
spatial_filter = <arcgis.geometry.filter>
fl.delete_features(geometry_filter=spatial_filter)

delete_oids = [1,2,3,4]
fl.delete_features(deletes=delete_oids)`;

export default deleteLT500Python;
