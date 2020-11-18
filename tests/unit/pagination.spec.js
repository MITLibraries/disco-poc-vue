import { shallowMount } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";

describe("Pagination.vue", () => {
  it("displays no pagination links when there are no hits", () => {
    const mockRoute = {
      query: { q: "obscura", page: "1" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 0,
        per_page: 20,
      },
    });

    expect(wrapper.text()).toMatch("");
  });

  it("displays message when viewing all results", () => {
    const mockRoute = {
      query: { q: "obscura", page: "1" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 5,
        per_page: 20,
      },
    });

    expect(wrapper.text()).toMatch("Viewing all results");
  });

  it("displays only next when on first page of results", () => {
    const mockRoute = {
      query: { q: "obscura", page: "1" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 25,
        per_page: 20,
      },
    });

    expect(wrapper.text()).toMatch("Next");
    expect(wrapper.text()).not.toMatch("Previous");
    expect(wrapper.text()).not.toMatch("First");
  });

  it("displays only next and previous when on second page", () => {
    const mockRoute = {
      query: { q: "obscura", page: "2" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 100,
        per_page: 20,
      },
    });

    expect(wrapper.text()).toMatch("Next");
    expect(wrapper.text()).toMatch("Previous");
    expect(wrapper.text()).not.toMatch("First");
  });

  it("displays next previous and first when on third page", () => {
    const mockRoute = {
      query: { q: "obscura", page: "3" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 100,
        per_page: 20,
      },
    });

    expect(wrapper.text()).toMatch("Next");
    expect(wrapper.text()).toMatch("Previous");
    expect(wrapper.text()).toMatch("First");
  });

  it("does not show next when on last page but shows previous and first", () => {
    const mockRoute = {
      query: { q: "obscura", page: "3" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 59,
        per_page: 20,
      },
    });

    expect(wrapper.text()).not.toMatch("Next");
    expect(wrapper.text()).toMatch("Previous");
    expect(wrapper.text()).toMatch("First");
  });

  it("goes to next page when next is clicked", () => {
    const mockRoute = {
      query: { q: "obscura", page: "3" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 100,
        per_page: 20,
      },
    });

    wrapper.find("button#nextPage").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { page: "4", q: "obscura" },
    });
  });

  it("goes to previous page when previous is clicked", () => {
    const mockRoute = {
      query: { q: "obscura", page: "3" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 100,
        per_page: 20,
      },
    });

    wrapper.find("button#prevPage").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { page: "2", q: "obscura" },
    });
  });

  it("goes to previous page when previous is clicked", () => {
    const mockRoute = {
      query: { q: "obscura", page: "3" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(Pagination, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      props: {
        hits: 100,
        per_page: 20,
      },
    });

    wrapper.find("button#firstPage").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      query: { page: "1", q: "obscura" },
    });
  });
});
