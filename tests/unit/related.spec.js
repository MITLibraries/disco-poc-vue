import { shallowMount } from "@vue/test-utils";
import Related from "@/components/Related.vue";

describe("Related.vue", () => {
  it("renders props.msg when passed", () => {
    const related = "new message";
    const wrapper = shallowMount(Related, {
      props: { related }
    });
    expect(wrapper.text()).toMatch(related);
  });
});
