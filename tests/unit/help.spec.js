import { shallowMount } from "@vue/test-utils";
import Help from "@/components/Help.vue";

describe("Help.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Help, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
