import { mount, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";
import Results from "@/views/Results.vue";

var mockResponse = {};

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Results.vue", () => {
  it("returns no results", async () => {
    mockResponse = {
      status: 200,
      data: {
        hits: 0,
        results: []
      }
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      query: { q: "obscura" }
    };
    const mockRouter = {
      push: jest.fn()
    };

    const wrapper = mount(Results, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/search?q=obscura"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.vm.$data.hits).toBe(0);
      expect(wrapper.vm.$data.results.length).toBe(0);
    });
  });

  it("loads a single record", async () => {
    mockResponse = {
      status: 200,
      data: {
        hits: 1,
        results: [
          {
            id: "002574584",
            title: "Cheese",
            source: "MIT Aleph"
          }
        ]
      }
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      query: { q: "cheese" }
    };
    const mockRouter = {
      push: jest.fn()
    };

    const wrapper = mount(Results, {
      global: {
        components: {
          RouterLink: RouterLinkStub
        },
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/search?q=cheese"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.vm.$data.hits).toBe(1);
      expect(wrapper.text()).toMatch("Cheese");
      expect(wrapper.vm.$data.results[0].id).toBe("002574584");
      expect(wrapper.vm.$data.results[0].title).toBe("Cheese");
    });
  });

  it("loads multiple records", async () => {
    mockResponse = {
      status: 200,
      data: {
        hits: 2,
        results: [
          {
            id: "002574584",
            title: "Cheese",
            source: "MIT Aleph"
          },
          {
            id: "002574585",
            title: "Fromage",
            source: "MIT Aleph"
          }
        ]
      }
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      query: { q: "cheese" }
    };
    const mockRouter = {
      push: jest.fn()
    };

    const wrapper = mount(Results, {
      global: {
        components: {
          RouterLink: RouterLinkStub
        },
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/search?q=cheese"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.vm.$data.hits).toBe(2);
      expect(wrapper.text()).toMatch("Cheese");
      expect(wrapper.text()).toMatch("Fromage");
      expect(wrapper.vm.$data.results[0].id).toBe("002574584");
      expect(wrapper.vm.$data.results[0].title).toBe("Cheese");
      expect(wrapper.vm.$data.results[1].id).toBe("002574585");
      expect(wrapper.vm.$data.results[1].title).toBe("Fromage");
    });
  });

  it("catches errors", async () => {
    mockResponse = {
      status: 500,
      data: {
        error: "Now you've done it"
      }
    };

    axios.get.mockImplementation(() => Promise.reject(mockResponse));

    const mockRoute = {
      query: { q: "snow crash" }
    };
    const mockRouter = {
      push: jest.fn()
    };

    const wrapper = mount(Results, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/search?q=snow crash"
    );

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("Something went wrong");
      expect(wrapper.text()).toMatch("Starting over may help");
    });
  });
});
