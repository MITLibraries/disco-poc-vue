import { shallowMount } from "@vue/test-utils";
import About from "@/components/About.vue";

describe("About.vue", () => {
  it("renders data.about when passed", () => {
    const about = "new message";
    const wrapper = shallowMount(About, {
      props: { modelValue: about }
    });
    expect(wrapper.text()).toMatch(about);
  });
});
