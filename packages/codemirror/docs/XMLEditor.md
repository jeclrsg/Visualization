# XMLEditor

<!--meta
{
    "id": 19255,
    "name": "XMLEditor",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "XMLEditor.ts",
            "line": 3,
            "character": 22
        }
    ],
    "extendedTypes": [
        {
            "type": "reference",
            "name": "Editor",
            "id": 15805
        }
    ],
    "folder": "packages/codemirror"
}
-->

XMLEditor displays an editable snippet of XML with syntax coloring and code folding.

```sample-code
import { XMLEditor } from "@hpcc-js/codemirror";

const code = `\
<?xml version="1.0" encoding="UTF-8"?>
<CATALOG>
   <CD>
      <TITLE>Empire Burlesque</TITLE>
      <ARTIST>Bob Dylan</ARTIST>
      <COUNTRY>USA</COUNTRY>
      <COMPANY>Columbia</COMPANY>
      <PRICE>10.90</PRICE>
      <YEAR>1985</YEAR>
   </CD>
   <CD>
      <TITLE>Hide your heart</TITLE>
      <ARTIST>Bonnie Tyler</ARTIST>
      <COUNTRY>UK</COUNTRY>
      <COMPANY>CBS Records</COMPANY>
      <PRICE>9.90</PRICE>
      <YEAR>1988</YEAR>
   </CD>
</CATALOG>
`;

new XMLEditor()
   .target("target")
   .xml(code)
   .render()
   ;
```

## API

## Published Properties
```@hpcc-js/codemirror:XMLEditor
```
