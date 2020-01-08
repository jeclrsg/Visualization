import { select as d3Select, Utility } from "@hpcc-js/common";
import { HPCCIndex } from "./hpccIndex.js";
import { HPCCScrollNav } from "./hpccScrollNav.js";
import { Markdown } from "./markdown.js";

// @ts-ignore
import * as indexJson from "../src-umd/index.json";

const params: any = Utility.urlParams();
const isDebug = !!params.debug;
if (isDebug) {
    d3Select("#topnav")
        .style("height", "0px")
        .style("display", "none")
        ;
    d3Select("#page")
        .style("top", "0px")
        ;
    d3Select("#leftnav")
        .style("width", "0px")
        .style("display", "none")
        ;
    d3Select("#rightnav")
        .style("width", "0px")
        .style("display", "none")
        ;
    d3Select("#content")
        .style("max-width", "100%")
        ;
}

function transformIndexJson(indexJson) {

    const leftnavMap = {};
    const leftnavData = [];

    indexJson.map(row => {
        const { root, folder, path, headings } = row;
        const packageLabel = root.indexOf("packages/") === 0 ? `@hpcc-js/${root.substr("packages/".length)}` : "";
        const navFolder = packageLabel || folder;
        const folderPath = `${root}${!!root ? "/" : ""}docs/${folder}${!!folder ? "/" : ""}`;
        const mdFile = path.substr(folderPath.length);

        const label = mdFile === "index.md" ? "Overview" : headings && headings.length ? headings[0].text : mdFile.replace(".md", "");
        if (navFolder) {
            if (leftnavMap[navFolder] === undefined) {
                leftnavMap[navFolder] = leftnavData.length;
                leftnavData.push({
                    label: navFolder,
                    children: []
                });
            }
            leftnavData[leftnavMap[navFolder]].children.push({
                label,
                path
            });
        } else {
            if (leftnavMap[path] === undefined) {
                leftnavMap[path] = leftnavData.length;
                leftnavData.push({
                    label,
                    path,
                    children: []
                });
            }
        }
    });

    leftnavData.sort((l, r) => {
        const folderSort = (l.children.length > 0 ? 1 : 0) - (r.children.length > 0 ? 1 : 0);
        if (folderSort) return folderSort;

        return 0;
    });
    leftnavData.forEach(row => {
        row.children.sort((l, r) => {
            const lIndexMD = l.path.indexOf("index.md") >= 0 ? 1 : 0;
            const rIndexMD = r.path.indexOf("index.md") >= 0 ? 1 : 0;
            const indexMdSort = rIndexMD - lIndexMD;
            if (indexMdSort) return indexMdSort;

            return l.path.localeCompare(r.path);
        });
    });
    return leftnavData;
}

export class App {
    leftnavData = transformIndexJson(indexJson);
    leftnav = new HPCCIndex()
        .target("leftnav")
        .data(this.leftnavData)
        .render()
        ;

    content = new Markdown()
        .target("content")
        .markdown("")
        .render()
        ;

    rightnav = new HPCCScrollNav()
        .target("rightnav")
        .data([])
        .render()
        ;

    constructor() {
        const context = this;
        this.content.on("scroll", function () {
            if (context.rightnav._tempDisableScrollHandler) {
                context.rightnav._tempDisableScrollHandler = false;
                return;
            }
            const contentNode = this.element().node();
            const anchors = contentNode.querySelectorAll("h1 > a,h2 > a");
            const contentRect = contentNode.getBoundingClientRect();
            const yOffset = contentRect.top;
            let scrollIndex = 0;
            for (let i = 0; i < anchors.length; i++) {
                const rect = anchors[i].getBoundingClientRect();
                if (rect.top > 0 + yOffset) {
                    break;
                }
                scrollIndex = i;
            }
            const rightnavNode = context.rightnav.element().node();
            if (rightnavNode) {
                const rightnavAnchor = rightnavNode.querySelectorAll(".hpccNavScroll-li")[scrollIndex];
                const top = rightnavAnchor.getBoundingClientRect().top;
                context.rightnav.moveMarker(top - yOffset - 2);
            }
        });

        this.leftnav.on("clicked", (path: string) => {
            window.location.hash = path;
        });

        if (window.location.hash) {
            this.hashChange();
        } else {
            window.location.hash = "docs/index.md";
        }
    }

    showPage(path, heading?) {
        return new Promise(resolve => {
            import("../../" + path).then(md => {
                this.content
                    .path(path)
                    .markdown(md)
                    .lazyRender(w => {
                        this.rightnav
                            .data(w._anchors)
                            .render()
                            ;
                        resolve();
                    })
                    ;
            }).catch(e => {
                this.content
                    .path(path)
                    .markdown(`\
    # File not found

    Unable to locate:  \`"${path}"\`
    `)
                    .lazyRender(w => {
                        this.rightnav
                            .data([])
                            .render()
                            ;
                        resolve();
                    })
                    ;
            });
        });
    }

    _prevHash = "";
    hashChange() {
        let hash = window.location.hash.substr(1);
        const parts = this._prevHash.split("/");
        parts.pop();
        if (hash.indexOf("#") >= 0) {
            const hashParts = hash.split("#");
            if (this._prevHash.split("#")[0] !== hashParts[0]) {
                this._prevHash = hash;
                this.showPage(hashParts[0], hashParts[1]);
            }
            return;
        } else if (hash.indexOf("../") === 0) {
            while (hash.indexOf("../") === 0) {
                parts.pop();
                hash = hash.substr(3);
            }
            hash = parts.join("/") + (parts.length ? "/" : "") + hash;
            window.history.replaceState(undefined, undefined, window.location.pathname + "#" + hash);
        } else if (hash.indexOf("./") === 0) {
            hash = parts.join("/") + hash.substr(1);
            window.history.replaceState(undefined, undefined, window.location.pathname + "#" + hash);
        }
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            this.showPage(hash);
        }
    }
}
