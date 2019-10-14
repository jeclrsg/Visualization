var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpcc-js/common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require("@hpcc-js/common");
    var Sample = /** @class */ (function (_super) {
        __extends(Sample, _super);
        function Sample() {
            var _this = _super.call(this) || this;
            _this._widget = null;
            return _this;
        }
        Sample.prototype.infostring = function () {
            return this.data()[0][0];
        };
        Sample.prototype.text = function () {
            return this.data()[0][1];
        };
        Sample.prototype.htmlNodeID = function () {
            return this.id() + "-html";
        };
        Sample.prototype.systemJSUrl = function () {
            return this.id() + "!./src-umd/markdownPlugins/sample.js";
        };
        Sample.prototype.systemsRegistryDelete = function () {
            System.registry.delete(System.normalizeSync(this.systemJSUrl()));
        };
        Sample.prototype.enter = function (domNode, element) {
            _super.prototype.enter.call(this, domNode, element);
            this._sampleDiv = element.append("div")
                .attr("id", this.htmlNodeID())
                .datum(null);
        };
        Sample.prototype.update = function (domNode, element) {
            var _this = this;
            _super.prototype.update.call(this, domNode, element);
            this._sampleDiv
                .style("width", this.width() + "px")
                .style("height", this.height() + "px");
            var js = this.text();
            if (js && this._prevJS !== js) {
                this._prevJS = js;
                this._sampleDiv.text("");
                var loading_1 = this._sampleDiv.append("div").text("...loading...");
                this.systemsRegistryDelete();
                this._widget = null;
                System.import(this.systemJSUrl()).then(function () {
                    loading_1.remove();
                    var element = _this._sampleDiv.select(".common_Widget");
                    if (!element.empty()) {
                        _this._widget = element.datum();
                        _this.changed(_this._widget);
                    }
                }).catch(function (e) {
                    _this.changed(_this._widget);
                    _this._sampleDiv.node().innerText = e.message;
                    _this.systemsRegistryDelete();
                });
            }
            else if (this._widget) {
                this._widget
                    .resize()
                    .render();
            }
        };
        Sample.prototype.changed = function (widget) {
        };
        return Sample;
    }(common_1.HTMLWidget));
    exports.Sample = Sample;
    //  SystemJS Plugin (converts javascript into a html <script> instance via babel) ---
    function fetch(url) {
        var parts = url.address.split("/");
        var sampleWidget = document.getElementById(parts.pop())["__data__"];
        return "window.shared = window.shared || {};\n\n" + sampleWidget.text().replace('.target("target")', ".target(\"" + sampleWidget.htmlNodeID() + "\")") + "\n";
    }
    exports.fetch = fetch;
});
//# sourceMappingURL=sample.js.map