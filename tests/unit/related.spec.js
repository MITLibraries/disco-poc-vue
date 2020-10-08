import { shallowMount } from "@vue/test-utils";
import Related from "@/components/Related.vue";

describe("Related.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Related, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
