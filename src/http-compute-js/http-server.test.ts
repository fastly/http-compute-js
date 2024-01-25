import { expect, test } from "vitest";
import { toComputeResponse, toReqRes } from "./http-server";

test("multiple set-cookie headers", async () => {
  const { res: nodeRes } = toReqRes(new Request("https://example.com"));

  // taken from https://nodejs.org/api/http.html#responsesetheadername-value
  nodeRes.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
  nodeRes.writeHead(200);
  nodeRes.end();

  const webResponse = await toComputeResponse(nodeRes);
  expect(webResponse.headers.get("set-cookie")).toEqual(
    "type=ninja, language=javascript"
  );
});

test("streaming", async () => {
  const { res: nodeRes } = toReqRes(new Request("https://example.com"));

  nodeRes.writeHead(200);
  nodeRes.write("hello");

  const webResponse = await toComputeResponse(nodeRes);
  expect(webResponse.status).toEqual(200);
  const reader = webResponse.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  expect(await reader.read()).toEqual({ done: false, value: "hello" });
  nodeRes.write("world");
  expect(await reader.read()).toEqual({ done: false, value: "world" });
  nodeRes.end();
  expect(await reader.read()).toEqual({ done: true, value: undefined });
});
