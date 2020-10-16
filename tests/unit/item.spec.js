import { shallowMount } from "@vue/test-utils";
import Item from "@/components/Item.vue";

describe("Item.vue", () => {
  it("renders props.result.title when passed", () => {
    const result = {
    	title: 'The great American novel'
    };
    const wrapper = shallowMount(Item, {
      props: { result }
    });
    expect(wrapper.text()).toMatch(result.title);
  });
});
