import { shallowMount } from "@vue/test-utils";
import Help from "@/components/Help.vue";

describe("Help.vue", () => {
  it("renders data.help when passed", () => {
    const help = "new message";
    const wrapper = shallowMount(Help, {
      propsData: { modelValue: help }
    });
    expect(wrapper.text()).toMatch(help);
  });
});
