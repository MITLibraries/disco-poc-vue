import { shallowMount } from "@vue/test-utils";
import Record from "@/components/Record.vue";

describe("Record.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Record, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
