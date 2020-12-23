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
        facetDisplayName: "Language",
      },
    });

    expect(wrapper.text()).toMatch("Language");
    expect(wrapper.text()).toMatch("english (1)");
    expect(wrapper.text()).toMatch("french (2)");
  });

  it("hides facet list if no facets are available", () => {
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
    expect(wrapper.vm.$data.checkedFacets).toContain("english");

    await checkbox.setValue(false);
    expect(wrapper.vm.$data.checkedFacets).toEqual([]);
  });

  it("adds string facets based on URL params", async () => {
    const mockRoute = {
      query: { q: "cheese", page: "1", source: "MIT Aleph" },
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
        facetList: [{ name: "MIT Aleph", count: 1 }],
        facetHeader: "source",
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.checkedFacets).toEqual(["MIT Aleph"]);
    expect(
      wrapper.find('input[type="checkbox"][value="MIT Aleph"]').element.checked
    ).toBe(true);
  });

  it("adds array facets based on URL params", async () => {
    const mockRoute = {
      query: { q: "cheese", page: "1", language: ["english"] },
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

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.checkedFacets).toEqual(["english"]);
  });

  it("removes facets based on URL params", async () => {
    const mockRoute = { query: { q: "cheese", page: "1" } };
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
      data() {
        return {
          checkedFacets: ["english"],
        };
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.checkedFacets).toEqual([]);
  });

  it("applies facets as strings when required", async () => {
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
        facetList: [{ name: "cave in Switzerland", count: 1 }],
        facetHeader: "source",
      },
    });

    const checkbox = wrapper.find(
      'input[type="checkbox"][value="cave in Switzerland"]'
    );

    await checkbox.setValue(true);

    expect(wrapper.vm.$data.checkedFacets).toEqual(["cave in Switzerland"]);
    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { page: "1", q: "cheese", source: "cave in Switzerland" },
    });
  });

  it("applies facets as arrays when required", async () => {
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
        facetList: [{ name: "romansh", count: 1 }],
        facetHeader: "language",
      },
    });

    const checkbox = wrapper.find('input[type="checkbox"][value="romansh"]');

    await checkbox.setValue(true);

    expect(wrapper.vm.$data.checkedFacets).toEqual(["romansh"]);
    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { page: "1", q: "cheese", language: ["romansh"] },
    });
  });

  it("reverts to page 1 when a facet is applied via checkbox", async () => {
    const mockRoute = {
      query: { q: "cheese", page: "5" },
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
        facetList: [{ name: "romansh", count: 1 }],
        facetHeader: "language",
      },
    });

    await wrapper.vm.$nextTick();

    const checkbox = wrapper.find('input[type="checkbox"][value="romansh"]');

    await checkbox.setValue(true);

    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { page: "1", q: "cheese", language: ["romansh"] },
    });
  });

  it("does not revert to page 1 when a facet is applied via URL params", async () => {
    const mockRoute = {
      query: {
        q: "cheese",
        page: "5",
        language: ["romansh"],
        source: "Suisse",
      },
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
        facetList: [{ name: "romansh", count: 1 }],
        facetHeader: "language",
      },
    });

    await wrapper.vm.$nextTick();

    expect(mockRouter.push).toHaveBeenCalledWith({
      query: {
        page: "5",
        q: "cheese",
        language: ["romansh"],
        source: "Suisse",
      },
    });
  });

  it("reverts to page 1 when a facet is removed via checkbox", async () => {
    const mockRoute = {
      query: { q: "cheese", page: "5", language: ["romansh"] },
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
        facetList: [{ name: "romansh", count: 1 }],
        facetHeader: "language",
      },
    });

    await wrapper.vm.$nextTick();

    const checkbox = wrapper.find('input[type="checkbox"][value="romansh"]');

    await checkbox.setValue(false);

    expect(wrapper.vm.$data.checkedFacets).toEqual([]);
    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { page: "1", q: "cheese" },
    });
  });

  it("does not return to page 1 when a facet is removed via URL params", async () => {
    const mockRoute = {
      query: { q: "cheese", page: "5" },
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
        facetList: [{ name: "romansh", count: 1 }],
        facetHeader: "language",
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.checkedFacets).toEqual([]);
    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { q: "cheese", page: "5" },
    });
  });

  it("does not update facets from URL if query object is missing", async () => {
    const mockRoute = {
      foo: "bar",
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
    });

    await wrapper.vm.$nextTick();

    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });
});
