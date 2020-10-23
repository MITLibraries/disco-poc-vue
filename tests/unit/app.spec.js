import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("has internal data", () => {
    expect(typeof App.data).toBe("function");
    // Do we need to test for specific data structures?
  });
  it("stores a search string when doSearch is called", () => {
    const wrapper = mount(App);
    wrapper.vm.doSearch("");
    expect(wrapper.vm.query).toBe("");
    wrapper.vm.doSearch("apples");
    expect(wrapper.vm.query).toBe("apples");
  });
  it("handles errors", () => {
    const wrapper = mount(App);
    expect(wrapper.vm.status.errored).toBe(false);
    wrapper.vm.searchTimdex("");
    // Not sure how to test async API calls that should produce errors
  });
});
