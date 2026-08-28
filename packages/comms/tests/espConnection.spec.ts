import { describe, it, expect } from "vitest";

import { ESPConnection, ESPExceptions, isExceptions } from "@hpcc-js/comms";

describe("ESPConnection", function () {
    it("basic", function () {
        expect(ESPConnection).to.be.a("function");
    });
});

describe("isExceptions", function () {
    it("recognizes an ESPExceptions instance", function () {
        const e = new ESPExceptions("SomeAction", {}, { Source: "test", Exception: [{ Code: 1, Message: "boom" }] });
        expect(isExceptions(e)).to.be.true;
    });

    it("recognizes a duck-typed ESP exception object", function () {
        const e = { isESPExceptions: true, Exception: [{ Code: 1, Message: "boom" }] };
        expect(isExceptions(e)).to.be.true;
    });

    it("rejects a plain Error", function () {
        expect(isExceptions(new Error("network down"))).to.be.false;
    });

    it("rejects a duck-typed object missing an Exception array", function () {
        expect(isExceptions({ isESPExceptions: true })).to.be.false;
    });

    it("does not throw and returns false for null/undefined", function () {
        expect(isExceptions(null)).to.be.false;
        expect(isExceptions(undefined)).to.be.false;
    });
});
