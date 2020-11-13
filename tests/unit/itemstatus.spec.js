import { shallowMount } from "@vue/test-utils";
import ItemStatus from "@/components/ItemStatus.vue";

describe("ItemStatus.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(ItemStatus, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
