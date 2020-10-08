import { shallowMount } from "@vue/test-utils";
import About from "@/components/About.vue";

describe("About.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(About, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
