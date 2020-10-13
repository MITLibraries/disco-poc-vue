import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Button, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
