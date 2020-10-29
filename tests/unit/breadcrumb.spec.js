import { shallowMount } from "@vue/test-utils";
import Breadcrumb from "@/components/Breadcrumb.vue";

describe("Breadcrumb.vue", () => {
  var wrapper = shallowMount(Breadcrumb, {});
  it("starts with two links", () => {
    expect(wrapper.text()).toMatch("Libraries home");
    expect(wrapper.text()).toMatch("Search");
  });
  // Need to write tests for manipulating the breadcrumb
});
