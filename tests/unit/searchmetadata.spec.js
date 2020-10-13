import { shallowMount } from "@vue/test-utils";
import SearchMetadata from "@/components/SearchMetadata.vue";

describe("SearchMetadata.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(SearchMetadata, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
