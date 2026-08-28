import { describe, it, expect } from "vitest";

import { LogicalFile } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

describe("LogicalFile error handling", () => {
    //  Non-ESP rejections must propagate unchanged, not be replaced by a TypeError
    //  from blindly reading `.Exception` off a shape they don't have.
    it("fetchInfo rethrows a non-ESP rejection untouched", async () => {
        const lf = LogicalFile.attach({ baseUrl: ESP_URL }, "mythor", "does::not::matter");
        const networkError = new Error("network down");
        (lf as any).connection.DFUInfo = () => Promise.reject(networkError);
        await expect(lf.fetchInfo()).rejects.toBe(networkError);
    });
});
