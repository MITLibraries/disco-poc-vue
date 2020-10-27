import { mount } from "@vue/test-utils";
import axios from "axios";
import moxios from "moxios";
import sinon from "sinon";
import App from "@/App";

describe("App.vue", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("makes a successful API request", done => {
    const wrapper = mount(App);

    moxios.stubRequest("/api/v1/search?q=james+baldwin", {
      status: 200,
      response: {
        results: [
          {
            id: "1",
            content_type: "Text",
            publication_date: "1963",
            title: "The fire next time.",
            contributors: [{ kind: "author", value: "Baldwin, James, 1924-1987." }]
          }
        ]
      }
    });

    let onFulfilled = sinon.spy();
    axios.get("/api/v1/search?q=james+baldwin").then(onFulfilled);

    moxios.wait(() => {
      expect(onFulfilled.getCall(0).args[0].data.results.length).toBe(1);
      done();
    });
  });
});
