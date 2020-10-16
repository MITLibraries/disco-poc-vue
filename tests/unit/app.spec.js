import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("has internal data", () => {
    expect(typeof App.data).toBe('function');
  });
  it("stores a search string when doSearch is called", () => {
    const wrapper = mount(App);
    wrapper.vm.doSearch('apples');
    expect(wrapper.vm.query).toBe('apples');
  });
});
