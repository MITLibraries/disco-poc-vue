import { shallowMount } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";

describe("Pagination.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Pagination, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
