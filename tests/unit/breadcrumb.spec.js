import { shallowMount } from "@vue/test-utils";
import Breadcrumb from "@/components/Breadcrumb.vue";

describe("Breadcrumb.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Breadcrumb, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
