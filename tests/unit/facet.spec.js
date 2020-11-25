import { shallowMount } from "@vue/test-utils";
import Facet from "@/components/Facet.vue";

describe("Facet.vue", () => {
  it("displays header and available facets in sidebar", () => {
    const mockRoute = {
      query: { q: "cheese", page: "1" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Facet, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        facetList: [
          { name: "english", count: 1 },
          { name: "french", count: 2 },
        ],
        facetHeader: "language",
      },
    });

    wrapper.setData({ checkedFacets: ["english"] });

    expect(wrapper.text()).toMatch("language");
    expect(wrapper.text()).toMatch("english (1)");
    expect(wrapper.text()).toMatch("french (2)");
  });

  it("hides facet list if no facets are available", () => {
    const wrapper = shallowMount(Facet, {
      props: {
        facetList: [],
        facetHeader: "language",
      },
    });

    const dl = wrapper.find("dl");
    expect(dl.exists()).toBe(false);
  });

  it("mutates v-model as expected when checkbox is clicked", async () => {
    const mockRoute = {
      query: { q: "cheese", page: "1" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Facet, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        facetList: [{ name: "english", count: 1 }],
        facetHeader: "language",
      },
    });

    const checkbox = wrapper.find('input[type="checkbox"][value="english"]');

    await checkbox.setValue(true);
    expect(wrapper.vm.checkedFacets).toContain("english");

    await checkbox.setValue(false);
    expect(wrapper.vm.checkedFacets).toEqual([]);
  });
});
