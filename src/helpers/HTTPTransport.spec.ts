import sinon from "sinon";
import HTTPTransport, { METHOD } from "./HTTPTransport";
import { expect } from "chai";
import { BASE_URL } from "../constants/constants";

describe("HttpTransport", () => {
    afterEach(() => {
        sinon.restore();
    });
    it("Должна сформироваться строка с параметрами", async () => {
        const http = new HTTPTransport({ url: "/test" });
        const requestStub = sinon.stub(http, "request").resolves();

        await http.get("", { data: { a: "1", b: "2 33" } });

        const expectedUrl = `${BASE_URL}/test?a=1&b=2%2033`;

        expect(requestStub.calledWithMatch(expectedUrl, { method: METHOD.GET }))
            .to.be.true;
    });
});
