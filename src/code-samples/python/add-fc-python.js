const addFCPython = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

# get the feature layer we want to add data to
item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

features = []
for i in range(0, 600):
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

fields = [
  {
      'name': 'STATE',
      'type': 'esriFieldTypeString'
  }
]

featureCollection = {
  'featureCollection': {
      'layers': [ 
          {
              'layerDefinition': {
                  'geometryType': 'esriGeometryPoint',
                  'type': 'Feature Layer',
                  'fields': fields
              },
              'featureSet': {
                  'geometryType': 'esriGeometryPoint',
                  'features': features                        
              }
          }
      ]
  }
}

tbl_name = 'Point layer'
append_res = fl.append(upload_format='featureCollection', source_table_name=tbl_name, edits=featureCollection, upsert=False)`;

export default addFCPython;
