## wsdl-to-ts

A command line tool for generating TypeScript types from a WSDL definition.

## Usage

From root of the hpcc-js comms package `.../hpcc-js/packages/comms/` navigate to `./utils/wsdl-to-ts` and execute `npm run build`.

Then to use the tool, there is an npm script defined in the comms package.json:

```
npm run wsdl-to-ts
```

Produces the output:

```
No WSDL Url provided.

Usage: npm run wsdl-to-ts -- --url=someUrl

Available flags:
====================
--url=someUrl               A URL for a WSDL to be converted to TypeScript interfaces
--outDir=./some/path        The directory into which the generated TS interfaces will be written (defaults to "./wsdl").
--print                     Rather than writing files, print the generated TS interfaces to the CLI
```

Specifiying a url:

```
npm run wsdl-to-ts -- --url=http://play.hpccsystems.com:8010/Ws_Account/?wsdl
```

Would result in the creation of `./wsdl/WsAccount.ts`, containing TypeScript interfaces, enums and potentially primitives, eg. TS type wrappers for things like `int`, `long`, etc.

