const addJsonLT500 = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

features = []
for i in range(0, 249):
    features.append(
        {
            'attributes': {
                'STATE': f'NewStateOfAdam__{i}'
            },
            'geometry': {
                'x': 0,
                'y': 0,
                'spatialReference': {
                    'wkid': 102100
                }
            }
        }
    )

edit_res = fl.edit_features(adds=features)`;

export default addJsonLT500;
