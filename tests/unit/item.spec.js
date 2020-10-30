import { shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import Item from "@/components/Item.vue";

describe("Item.vue", () => {
  it("renders props.result.title when passed", () => {
    const result = {
      title: "The great American novel",
      content_type: "Book",
      contributors: [
        {
          kind: "author",
          value: "John William De Forest"
        }
      ],
      publication_date: "1868",
      source_link: "http://library.mit.edu/item/000544411"
    };
    const wrapper = shallowMount(Item, {
      stubs: ["router-link", "router-view"],
      props: { result }
    });
    expect(wrapper.text()).toMatch(result.title);
    expect(wrapper.text()).toMatch(result.content_type);
    expect(wrapper.text()).toMatch(result.contributors[0].value);
    expect(wrapper.text()).toMatch(result.publication_date);
    expect(wrapper.text()).toMatch(result.source_link);
  });
});
