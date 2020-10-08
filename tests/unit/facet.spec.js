import { shallowMount } from "@vue/test-utils";
import Facet from "@/components/Facet.vue";

describe("Facet.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Facet, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
