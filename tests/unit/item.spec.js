import { mount, RouterLinkStub } from "@vue/test-utils";
import Item from "@/components/Item.vue";

describe("Item.vue", () => {
  it("renders props.result.title when passed", () => {
    const $router = {
      push: jest.fn()
    };
    const $route = {
      params: {
        recordId: "000544411"
      }
    };

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
      source_link: "http://library.mit.edu/item/000544411",
      subjects: ["fiction"]
    };
    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub
        },
        mocks: { $route, $router }
      },
      props: { result }
    });
    expect(wrapper.text()).toMatch(result.title);
    expect(wrapper.text()).toMatch(result.content_type);
    expect(wrapper.text()).toMatch(result.contributors[0].value);
    expect(wrapper.text()).toMatch(result.publication_date);
    expect(wrapper.html()).toMatch(result.source_link);
    expect(wrapper.text()).toMatch(result.subjects[0]);
  });
});
