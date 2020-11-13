import { shallowMount } from "@vue/test-utils";
import SearchForm from "@/components/SearchForm.vue";

describe("SearchForm.vue", () => {
  const wrapper = shallowMount(SearchForm, {});
  it("has internal data", () => {
    expect(typeof SearchForm.data).toBe("function");
  });
  it("renders a search form", () => {
    expect(wrapper.html()).toContain("Search");
  });
  it("computes newSearchQuery correctly", () => {
    // No intervention
    expect(SearchForm.computed.newSearchQuery.call({ query: "foo" })).toBe(
      "foo"
    );
    expect(
      SearchForm.computed.newSearchQuery.call({ query: "Keep all these words" })
    ).toBe("Keep all these words");
    // Trim whitespace
    expect(
      SearchForm.computed.newSearchQuery.call({ query: "   foo   " })
    ).toBe("foo");
    // Trim very long queries on a word boundary
    expect(
      SearchForm.computed.newSearchQuery.call({
        query:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada gravida ligula non auctor. Pellentesque tempor dapibus viverra. Duis eleifend ipsum id lectus fringilla, ac efficitur arcu facilisis. Vivamus convallis nisl non arcu porttitor euismod. Curabitur lorem tellus, tincidunt non ex vitae, ullamcorper sollicitudin nibh. Morbi semper augue quis erat ullamcorper feugiat. Duis posuere justo vitae fermentum mattis. Proin non odio eu sapien tincidunt fermentum. Quisque viverra posuere auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum convallis iaculis erat, vel tristique augue eleifend at. Sed scelerisque vehicula metus, ut commodo velit ornare vel. Vestibulum blandit luctus laoreet. Ut consequat et lorem vel laoreet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas pretium justo quam, ac mollis enim gravida vitae. Aenean at egestas augue. Aliquam eu malesuada nulla. Curabitur porttitor, magna id viverra malesuada, justo lorem commodo lorem, at maximus dui metus id velit. Praesent id consequat purus, condimentum tincidunt tortor. Duis ultricies ultricies nunc, vitae consectetur orci lobortis eu. Integer id justo in mauris auctor egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin sollicitudin purus a leo porttitor sodales. Etiam in elit tellus. Sed sed blandit mauris. Nunc pharetra orci ex, volutpat tempor nulla suscipit vel. Suspendisse eget metus ullamcorper, rhoncus odio non, feugiat elit. Duis volutpat vel nisl nec pellentesque. Cras viverra finibus eleifend.",
      })
    ).toBe(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada gravida ligula non auctor. Pellentesque tempor dapibus viverra. Duis eleifend ipsum id lectus fringilla, ac efficitur arcu facilisis. Vivamus convallis nisl non arcu porttitor euismod. Curabitur lorem tellus, tincidunt non ex vitae, ullamcorper sollicitudin nibh. Morbi semper augue quis erat ullamcorper feugiat. Duis posuere justo vitae fermentum mattis. Proin non odio eu sapien tincidunt fermentum. Quisque viverra posuere auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum convallis iaculis erat, vel tristique augue eleifend at. Sed scelerisque vehicula metus, ut commodo velit ornare vel. Vestibulum blandit luctus laoreet. Ut consequat et lorem vel laoreet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas pretium justo quam, ac mollis enim gravida vitae. Aenean at egestas augue. Aliquam eu malesuada nulla. Curabitur porttitor, magna id viverra malesuada, justo lorem commodo lorem, at maximus dui metus id velit. Praesent id consequat purus, condimentum tincidunt tortor. Duis ultricies ultricies nunc, vitae consectetur orci lobortis eu. Integer id justo in mauris auctor egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin sollicitudin purus a leo porttitor sodales. Etiam in elit tellus. Sed sed blandit mauris. Nunc pharetra orci ex, volutpat tempor"
    );
  });
});
