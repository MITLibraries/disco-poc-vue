import { shallowMount } from "@vue/test-utils";
import Item from "@/components/Item.vue";

describe("Item.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Item, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
