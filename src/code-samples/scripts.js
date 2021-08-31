// python
import addFCPython from "./python/add-fc-python.js";
import addFGDBPython from "./python/add-fgdb-python.js";
import deleteGT250Python from "./python/delete-gt250-python.js";
import deleteLT250Python from "./python/delete-lt250-python.js";
import addJsonLT500 from "./python/add-json-lt250-python.js";
import addJsonGT500 from "./python/add-json-gt250-python.js";
import addGeoJSONLT250Python from "./python/add-geojson-lt250-python.js";
import addGeoJSONGT250Python from "./python/add-geojson-gt250-python.js";
import addExcelPython from "./python/add-excel-python.js";
import addCSVLT250Python from "./python/add-csv-lt250-python.js";
import addCSVGT250Python from "./python/add-csv-gt250-python.js";
import addShpPython from "./python/add-shp-python";

// javascript
import addJsonLT500Javascript from "./javascript/add-json-lt250-javascript.js";

const scripts = {
  "add-fc-python": addFCPython,
  "add-fgdb-python": addFGDBPython,
  "delete-gt250-python": deleteGT250Python,
  "delete-lt250-python": deleteLT250Python,
  "add-json-lt250-python": addJsonLT500,
  "add-json-gt250-python": addJsonGT500,
  "add-geojson-lt250-python": addGeoJSONLT250Python,
  "add-geojson-gt250-python": addGeoJSONGT250Python,
  "add-excel-python": addExcelPython,
  "add-csv-lt250-python": addCSVLT250Python,
  "add-csv-gt250-python": addCSVGT250Python,
  "add-shp-python": addShpPython,
  // "add-json-lt250-javascript": addJsonLT500Javascript,
};

export default scripts;
