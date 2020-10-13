import { shallowMount } from "@vue/test-utils";
import SearchForm from "@/components/SearchForm.vue";

describe("SearchForm.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(SearchForm, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
