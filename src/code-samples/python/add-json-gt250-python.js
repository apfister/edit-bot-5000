const addJsonGT500 = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
gis = GIS("home")

# get our feature layer we want to add features to
item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

# helper function to split up our edits into chunks
def chunk_it(l, n):
    return [l[i:i+n] for i in range(0, len(l), n)]

# make some sample features in JSON format
features = []
for i in range(0, 5000):
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
    
# divide our features into chunks
feature_chunks = chunk_it(features, 500)

# go through each chunk and add to the feature layer
chunk_length = len(feature_chunks)
for i, chunk in enumerate(feature_chunks):
    try:
        fl.edit_features(adds=chunk)
    except Exception as e:    
        print ('error adding chunk')`;
export default addJsonGT500;
