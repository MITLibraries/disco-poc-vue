import { shallowMount } from "@vue/test-utils";
import SearchMetadata from "@/components/SearchMetadata.vue";

describe("SearchMetadata.vue", () => {
  it("reports search string and hit counts after a search", () => {
    const mockRoute = {
      query: { page: "1" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const hits = 6021023;
    const searchterm = "new message";
    const wrapper = shallowMount(SearchMetadata, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: { hits, searchterm },
    });

    expect(wrapper.text()).toMatch("Search Results");
    expect(wrapper.text()).toMatch(searchterm);
    expect(wrapper.text()).toMatch(String(hits));
    expect(wrapper.text()).toMatch("Viewing records 1 to 20 of " + hits);
  });

  it("displays 21 to 40 on page 2", () => {
    const mockRoute = {
      query: { page: "2" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const hits = 49;
    const wrapper = shallowMount(SearchMetadata, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },

      props: { hits },
    });

    expect(wrapper.text()).toMatch("Viewing records 21 to 40 of " + hits);
  });

  it("displays 1 to 7 of 7", () => {
    const mockRoute = {
      query: { page: "1" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const hits = 7;
    const wrapper = shallowMount(SearchMetadata, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },

      props: { hits },
    });

    expect(wrapper.text()).toMatch("Viewing records 1 to 7 of " + hits);
  });

  it("displays 21 to 38 of 38", () => {
    const mockRoute = {
      query: { page: "2" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const hits = 38;
    const wrapper = shallowMount(SearchMetadata, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },

      props: { hits },
    });

    expect(wrapper.text()).toMatch("Viewing records 21 to 38 of " + hits);
  });

  it("displays 1 to 20 when no page is passed", () => {
    const mockRoute = {
      query: {},
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const hits = 38;
    const wrapper = shallowMount(SearchMetadata, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },

      props: { hits },
    });
    expect(wrapper.text()).toMatch("Viewing records 1 to 20 of " + hits);
  });
});
