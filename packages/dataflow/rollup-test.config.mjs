import { external, globals } from "@hpcc-js/bundle";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json" with { type: "json" };

export default {
    input: "lib-es6/__tests__/index",
    external: external,
    output: [{
        file: "dist-test/index.js",
        format: "umd",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }],
    plugins: [
        alias({}),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({}),
        sourcemaps(),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
};