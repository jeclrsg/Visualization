import { HTMLWidget, Widget } from "@hpcc-js/common";
import * as marked from "marked";
import { markdownWidget } from "./markdownPlugins/index.js";

import "../src/markdown.css";

declare const hljs: any;

export class Markdown extends HTMLWidget {

    private _renderer = new marked.Renderer();
    private _origCode = this._renderer.code;
    private _origLink = this._renderer.link;
    private _origHtml = this._renderer.html;
    private _codeSamples: Widget[] = [];
    public _anchors = [];

    _path: string;
    path(): string;
    path(_: string): this;
    path(_?: string): this | string {
        if (!arguments.length) return this._path;
        this._path = _;
        return this;
    }

    _markdown: string;
    markdown(): string;
    markdown(_: string): this;
    markdown(_?: string): this | string {
        if (!arguments.length) return this._markdown;
        this._anchors = [];
        this._markdown = _;
        return this;
    }

    scroll() { }

    constructor() {
        super();

        //  Heading override ---
        const context = this;
        this._renderer.heading = (text, level) => {
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, "");
            const href = this.path() + "#" + escapedText;
            context._anchors.push({
                label: text,
                href: "#" + href
            });
            return `\
<h${level}>
    <a id="${href}" class="anchor" href="#${href}">
        <span class="header-link"></span>
    </a>
    ${text}
</h${level}>`;
        };

        //  Link override ---
        this._renderer.link = (href: string, title: string, text: string): string => {
            console.log("href:  " + href);
            const extLink = href.indexOf("http") === 0 || href.indexOf("file") === 0 || href.indexOf("api/") === 0;
            let retVal = this._origLink.call(this._renderer, (extLink ? "" : "#") + href, title, text);
            if (extLink) {
                retVal = retVal.replace('">', '" target="_blank">');
            }
            return retVal;
        };

        //  Code override ---
        this._renderer.code = (text: string, infostring: string, escaped: boolean) => {
            const mdWidget = markdownWidget(infostring, text);
            if (mdWidget) {
                return this.renderPlaceholder(mdWidget);
            }
            return this._origCode.call(this._renderer, text, infostring, escaped);
        };

        this._renderer.html = (html: string) => {
            if (html.indexOf("<!--meta") === 0) {
                html = html.substr(0, html.indexOf("-->"));
                const htmlParts = html.split("\n");
                const infostring = htmlParts.shift().substr("<!--".length);
                const mdWidget = markdownWidget(infostring, htmlParts.join("\n"));
                if (mdWidget) {
                    return this.renderPlaceholder(mdWidget);
                }
            }
            return this._origHtml.call(this._renderer, html);
        };
    }

    renderPlaceholder(mdWidget: Widget): string {
        this._codeSamples.push(mdWidget);
        return `<div id="placeholder${mdWidget.id()}"></div>`;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const context = this;
        element
            .style("overflow-x", "hidden")
            .style("overflow-y", "scroll")
            .on("scroll", function () {
                context.scroll.apply(this, arguments);
            })
            ;
    }

    private _prevMarkdown;
    update(domNode, element) {
        super.update(domNode, element);
        element.style("height", `${this.height()}px`);
        if (this._prevMarkdown !== this.markdown()) {
            this._prevMarkdown = this.markdown();
            this._codeSamples = [];
            element.html(marked(this.markdown(), {
                renderer: this._renderer,
                highlight: (code: string, lang: string, callback?: (error: any | undefined, code: string) => void): string => {
                    return hljs.highlightAuto(code).value;
                }
            }) + "<br>");
            this._codeSamples.forEach(cs => {
                cs
                    .target(`placeholder${cs.id()}`)
                    .render()
                    ;
            });
        } else {
            this._codeSamples.forEach(async (cs) => {
                await cs.resize().renderPromise();
            });
        }
    }
}
Markdown.prototype._class += " website_Markdown";

Markdown.prototype.publish("markdown", "", "string", "String to be rendered as markdown");
