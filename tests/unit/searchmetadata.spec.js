import { shallowMount } from "@vue/test-utils";
import SearchMetadata from "@/components/SearchMetadata.vue";

describe("SearchMetadata.vue", () => {
  it("reports search string and hit counts after a search", () => {
    const hits = 6021023;
    const query = "new message";
    const status = {
      errored: false,
      ready: true,
    };
    const wrapper = shallowMount(SearchMetadata, {
      props: { hits, query, status },
    });
    expect(wrapper.text()).toMatch("Results summary:");
    expect(wrapper.text()).toMatch(query);
    expect(wrapper.text()).toMatch(String(hits));
  });
  it("reports an interim message while waiting", () => {
    const hits = 0;
    const query = "foo";
    const status = {
      loading: true,
    };
    const waiting = shallowMount(SearchMetadata, {
      props: { hits, query, status },
    });
    expect(waiting.text()).toMatch("Loading results...");
  });
});
