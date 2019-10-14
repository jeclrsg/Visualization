import { HTMLWidget, select as d3Select } from "@hpcc-js/common";

export class HPCCScrollNav extends HTMLWidget {

    private _ul;
    private _marker;
    private _yOffset = 0;
    private _prevMarkerTop = 0;
    _tempDisableScrollHandler = false;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._marker = element.append("div")
            .attr("class", "hpccScrollNav-marker")
            .style("position", "relative")
            .style("top", "0px")
            .style("left", "-1px")
            .style("opacity", 0)
            ;
        this._ul = element.append("ul")
            .attr("class", "hpccNavScroll-ul")
            .style("list-style-type", "none")
            .style("border-left-width", "2px")
            .style("border-left-style", "solid")
            .style("border-left-color", "var(--border-color, #000)")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._yOffset = -domNode.getBoundingClientRect().top;

        const items = this._ul.selectAll(".hpccNavScroll-li").data(this.data(), d => d.label);
        const context = this;
        items.enter().append("li")
            .attr("class", "hpccNavScroll-li")
            .each(function (d) {
                const li = d3Select(this);
                li.append("a")
                    .html((d: any) => d.label)
                    .attr("href", d.href)
                    .on("click", function (d: any) {
                        const navAnchorTop = this.getBoundingClientRect().top;
                        context._tempDisableScrollHandler = true;
                        context.moveMarker(navAnchorTop + context._yOffset + 5);
                    })
                    ;
            })
            ;
        if (this.data().length > 0 && this._prevMarkerTop === 0) {
            const firstNavAnchorTop = domNode.querySelector(".hpccNavScroll-li").getBoundingClientRect().top;
            context.moveMarker(firstNavAnchorTop + context._yOffset + 5);
        }
        items.exit().remove();
    }

    moveMarker(top) {
        this._marker
            .style("top", top + "px")
            .style("opacity", 1)
            ;
        this._prevMarkerTop = top;
    }

    clicked(path: string) {
    }
}
