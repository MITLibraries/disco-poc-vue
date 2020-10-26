import { shallowMount } from "@vue/test-utils";
import Facet from "@/components/Facet.vue";

describe("Facet.vue", () => {
  it("renders props.facet when passed", () => {
    const facet = "new message";
    const wrapper = shallowMount(Facet, {
      props: { facet }
    });
    expect(wrapper.text()).toMatch(facet);
  });
});
