const addCSVLT250Python = `from arcgis.gis import GIS
from arcgis.features import FeatureLayer
import csv
gis = GIS("home")

# get the feature layer we want to add data to
item = gis.content.get("cb77c2c4548d4de99c743bd7553b3b79")
fl = FeatureLayer.fromitem(item)

# read in a csv file and set some options to read
csv_path = './to_append.csv'
fields_to_use = ['STATE']
x_field = 'x'
y_field = 'y'
spatial_reference_wkid = 4326

# parse the csv file and create an array of features to add
features_to_append = []
with open(csv_path, 'r') as csv_file:
    reader = csv.DictReader(csv_file)
        
    for row in reader:
        feature = {
            'attributes': {},
            'geometry': {}
        }
        
        for f in fields_to_use:
            feature['attributes'][f] = row[f]

        x = row[x_field]
        y = row[y_field]
        
        try:
            x = int(row[x_field])
            y = int(row[y_field])
        except:
            x = 0
            y = 0         
            
        feature['geometry'] = {           
            'x': x,
            'y': y,
            'spatialReference': {
                'wkid': spatial_reference_wkid
            }
        }
        
        features_to_append.append(feature)

# append the data
edit_res = fl.edit_features(adds=features_to_append)`;

export default addCSVLT250Python;
