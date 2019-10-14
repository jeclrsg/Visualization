# ECLEditor

<!--meta
{
    "id": 17096,
    "name": "ECLEditor",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "ECLEditor.ts",
            "line": 5,
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

ECLEditor displays an editable snippet of ECL with syntax coloring.

```sample-code

import { ECLEditor } from "@hpcc-js/codemirror";

const code = `\
MySample := SAMPLE(Person,10,1) // get every 10th record

SomeFile := DATASET([{'A'},{'B'},{'C'},{'D'},{'E'},
                     {'F'},{'G'},{'H'},{'I'},{'J'},
                     {'K'},{'L'},{'M'},{'N'},{'O'},
                     {'P'},{'Q'},{'R'},{'S'},{'T'},
                     {'U'},{'V'},{'W'},{'X'},{'Y'}],
                     {STRING1 Letter});
Set1 := SAMPLE(SomeFile,5,1); // returns A, F, K, P, U`;

new ECLEditor()
    .target("target")
    .text(code)
    .render()
    ;

```

## API

## Published Properties
```@hpcc-js/codemirror:ECLEditor
```
