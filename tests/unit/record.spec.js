import { shallowMount } from "@vue/test-utils";
import Record from "@/components/Record.vue";

describe("Record.vue", () => {
  it("renders data.record when passed", () => {
    const record = "new message";
    const wrapper = shallowMount(Record, {
      props: { modelValue: record }
    });
    expect(wrapper.text()).toMatch(record);
  });
});
