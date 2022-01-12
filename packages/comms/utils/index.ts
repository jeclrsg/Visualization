"use strict";

import { mkdirp, writeFile } from "fs-extra";
import * as path from "path";
import * as soap from "soap";
import minimist from "minimist";

import { Case, changeCase } from "./util";

type JsonObj = { [name: string]: any };

const lines: string[] = [];

const args = minimist(process.argv.slice(2));

const knownTypes: string[] = [];
const parsedTypes: JsonObj = {};

const primitiveMap: { [key: string]: string } = {
    "int": "number",
    "integer": "number",
    "unsignedInt": "number",
    "nonNegativeInteger": "number",
    "long": "number",
    "double": "number",
    "base64Binary": "number[]",
    "dateTime": "string",
}
const knownPrimitives: string[] = [];

const parsedEnums: JsonObj = {};

const debug = args?.debug ?? false;
const printToConsole = args?.print ?? false;
const outDir = args?.outDir ? args?.outDir : "./temp/wsdl";

const ignoredWords = ["targetNSAlias", "targetNamespace"];

function printDbg(...args: any[]) {
    if (debug) {
        console.log(...args);
    }
}

function wsdlToTs(uri: string): Promise<any> {
    return new Promise<soap.Client>((resolve, reject) => {
        soap.createClient(uri, {}, (err, client) => {
            if (err) reject(err);
            resolve(client);
        });
    }).then(client => {
        const wsdlDescr = client.describe();
        return wsdlDescr;
    });
}

function printUsage() {
    console.log("Usage: npm run wsdl-to-ts -- --url=someUrl\n");
    console.log("Available flags: ");
    console.log("====================");
    console.log("--url=someUrl\t\t\tA URL for a WSDL to be converted to TypeScript interfaces");
    console.log("--outDir=./some/path\t\tThe directory into which the generated TS interfaces will be written (defaults to \"./wsdl\").");
    console.log("--print\t\t\t\tRather than writing files, print the generated TS interfaces to the CLI");
}

if (!args.url) {
    console.error("No WSDL Url provided.\n");
    printUsage();
    process.exit(0);
}

if (args.help) {
    printUsage();
    process.exit(0);
}

function parseEnum(enumString: string) {
    const enumParts = enumString.split("|");
    return {
        type: enumParts[0],
        enumType: enumParts[1].replace(/xsd:/, ""),
        values: enumParts[2].split(",").map(v => {
            const member = v.split(" ").map(w => changeCase(w, Case.PascalCase)).join("");
            return `${member} = "${member}"`;
        })
    };
}

function parseTypeDefinition(operation: JsonObj, opName: string) {

    const typeDefn: JsonObj = {};
    printDbg(`processing ${opName}`, operation);
    for (const prop in operation) {
        const propName = (prop.indexOf("[]") < 0) ? prop : prop.slice(0, -2);
        if (typeof operation[prop] === "object") {
            const op = operation[prop];
            if (knownTypes.indexOf(propName) < 0) {
                knownTypes.push(propName);
                const defn = parseTypeDefinition(op, propName);
                if (prop.indexOf("[]") > -1) {
                    typeDefn[propName] = prop;
                } else {
                    typeDefn[propName] = defn;
                }
                parsedTypes[propName] = defn;
            } else {
                typeDefn[propName] = prop;
            }

        } else {
            if (ignoredWords.indexOf(prop) < 0) {
                const primitiveType = operation[prop].replace(/xsd:/gi, "");
                if (prop.indexOf("[]") > 0) {
                    typeDefn[prop.slice(0, -2)] = primitiveType + "[]";
                } else if (operation[prop].match(/.*\|.*\|.*/)) {
                    const { type, enumType, values } = parseEnum(operation[prop]);
                    parsedEnums[type] = values;
                    typeDefn[prop] = type;
                } else {
                    typeDefn[prop] = primitiveType;
                }
                if (Object.keys(primitiveMap).indexOf(primitiveType) > -1 && knownPrimitives.indexOf(primitiveType) < 0) {
                    knownPrimitives.push(primitiveType);
                }
            }
        }
    }

    if (knownTypes.indexOf(opName) < 0) {
        knownTypes.push(opName);
        parsedTypes[opName] = typeDefn;
    }
    return typeDefn;
}

wsdlToTs(args.url)
    .then(descr => {
        let namespace = "";
        for (const ns in descr) {
            namespace = changeCase(ns, Case.PascalCase);
            const service = descr[ns];
            printDbg("namespace: ", namespace, "\n");
            for (const op in service) {
                printDbg("binding: ", changeCase(op, Case.PascalCase), "\n");
                const binding = service[op];
                for (const svc in binding) {
                    const operation = binding[svc];
                    const request = operation["input"];
                    const reqName = svc + "Request";
                    const response = operation["output"];
                    const respName = svc + "Response";

                    parseTypeDefinition(request, reqName);
                    parseTypeDefinition(response, respName);
                }
            }
        }

        knownPrimitives.forEach(primitive => {
            printDbg(`${primitive} = ${primitiveMap[primitive]}`);
            lines.push(`type ${primitive} = ${primitiveMap[primitive]};`);
        });
        lines.push("\n\n");

        for (const name in parsedEnums) {
            lines.push(`export enum ${name} {\n\n`);
            lines.push(parsedEnums[name].join(",\n"));
            lines.push("\n\n}");
            lines.push("\n\n");
        }

        lines.push(`export namespace ${namespace} {\n`);

        for (const type in parsedTypes) {
            lines.push(`export interface ${type} {\n`);
            const typeString = JSON.stringify(parsedTypes[type], null, 4).replace(/"/g, "");
            lines.push(typeString.substring(1, typeString.length - 1) + "\n");
            // lines.push(parsedTypes[type]);
            lines.push("}\n");
        }

        lines.push("}\n");

        if (printToConsole) {
            console.log(lines.join("\n").replace(/\n\n\n/g, "\n"));
        } else {
            mkdirp(outDir).then(() => {
                const tsFile = path.join(outDir, namespace + ".ts");
                writeFile(tsFile, lines.join("\n").replace(/\n\n\n/g, "\n"), (err) => {
                    if (err) throw err;
                })
            })
        }
    }).catch(err => {
        console.error(err);
        process.exitCode = -1;
    });