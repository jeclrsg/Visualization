(function () {
    var systemjsConfig = {
        "map": {
            "plugin-css": "https://cdn.jsdelivr.net/npm/systemjs-plugin-css@0.1.37/css.js",
            "plugin-json": "https://cdn.jsdelivr.net/npm/systemjs-plugin-json@0.3.0/json.js",
            "plugin-text": "https://cdn.jsdelivr.net/npm/systemjs-plugin-text@0.0.11/text.js",
            "plugin-babel": "https://cdn.jsdelivr.net/npm/systemjs-plugin-babel@0.0.25/plugin-babel.js",
            "systemjs-babel-build": "https://cdn.jsdelivr.net/npm/systemjs-plugin-babel@0.0.25/systemjs-babel-browser.js",
            "marked": "https://cdn.jsdelivr.net/npm/marked@0.7.0",
            "prismjs": "https://cdn.jsdelivr.net/npm/prismjs@1.17.1",
            "d3-array": "https://cdn.jsdelivr.net/npm/d3-array",
            "d3-dsv": "https://cdn.jsdelivr.net/npm/d3-dsv",
            "d3-fetch": "https://cdn.jsdelivr.net/npm/d3-fetch",
            "d3-random": "https://cdn.jsdelivr.net/npm/d3-random",
            "d3-selection": "https://cdn.jsdelivr.net/npm/d3-selection",
            "@hpcc-js": "https://cdn.jsdelivr.net/npm/@hpcc-js"
        },
        "meta": {
            "*.css": {
                "loader": "plugin-css"
            },
            "*.json": {
                "loader": "plugin-json"
            },
            "*.md": {
                "loader": "plugin-text"
            },
            '*.js': {
                babelOptions: {
                    react: true
                }
            }
        },
        "transpiler": "plugin-babel"
    }

    if (window.location.origin !== "file://") {
        systemjsConfig.map["@hpcc-js"] = "https://cdn.jsdelivr.net/npm/@hpcc-js";
    } else {
        var packages = [
            "util", "comms", "common", "layout", "phosphor", "api", "dgrid", "chart", "other", "form",
            "tree", "graph", "map", "map-deck",
            "react", "composite", "marshaller", "html", "timeline", "codemirror", "eclwatch"
        ];
        packages.forEach(pkg => {
            systemjsConfig.map[`@hpcc-js/${pkg}`] = `../packages/${pkg}/dist/index.js`;
        });
    }

    SystemJS.config(systemjsConfig);
})();
