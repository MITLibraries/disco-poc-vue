import { mount, RouterLinkStub } from "@vue/test-utils";
import axios from "axios";
import Results from "@/views/Results.vue";

var mockResponse = {};

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Results.vue", () => {
  it("returns no results with friendly message", async () => {
    mockResponse = {
      status: 200,
      data: {
        hits: 0,
        results: [],
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      query: { q: "obscura" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Results, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
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
      expect(wrapper.text()).toMatch("Sorry, no results found for obscura.");
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
            source: "MIT Aleph",
          },
        ],
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      query: { q: "cheese" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Results, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
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
            source: "MIT Aleph",
          },
          {
            id: "002574585",
            title: "Fromage",
            source: "MIT Aleph",
          },
        ],
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      query: { q: "cheese" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Results, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
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
        error: "Now you've done it",
      },
    };

    axios.get.mockImplementation(() => Promise.reject(mockResponse));

    const mockRoute = {
      query: { q: "snow crash" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Results, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/search?q=snow%20crash"
    );

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("Something went wrong");
      expect(wrapper.text()).toMatch("Starting over may help");
    });
  });

  it("uses brackets syntax where appropriate in query strings", async () => {
    mockResponse = {
      status: 200,
      data: {
        hits: 0,
        results: [],
      },
    };

    axios.get.mockImplementation(() => Promise.reject(mockResponse));

    const mockRoute = {
      query: {
        q: "cheese",
        language: "english",
        contributor: ["cow", "goat"],
        content_type: "text",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Results, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/search?q=cheese&language%5B%5D=english&contributor%5B%5D=cow&contributor%5B%5D=goat&content_type=text"
    );

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
    });
  });

  it("translates facet headers to display versions", async () => {
    mockResponse = {
      status: 200,
      data: {
        hits: 2,
        results: [
          {
            id: "002574584",
            title: "Cheese",
            source: "MIT Aleph",
          },
          {
            id: "002574585",
            title: "Fromage",
            source: "MIT Aleph",
          },
        ],
        aggregations: {
          source: [
            {
              name: "mit aleph",
              count: 143,
            },
          ],
          content_format: [
            {
              name: "print volume",
              count: 36,
            },
            {
              name: "dvd-rom",
              count: 5,
            },
          ],
          subject: [
            {
              name: "children's songs.",
              count: 3,
            },
            {
              name: "cooking.",
              count: 2,
            },
            {
              name: "motion pictures.",
              count: 2,
            },
          ],
          contributor: [
            {
              name: "marvin, frankie.",
              count: 12,
            },
            {
              name: "brown, james, 1933-2006.",
              count: 9,
            },
            {
              name: "djll, tom.",
              count: 7,
            },
            {
              name: "dexter, al.",
              count: 4,
            },
          ],
          content_type: [
            {
              name: "text",
              count: 100,
            },
            {
              name: "sound recording",
              count: 28,
            },
          ],
          collection: [
            {
              name: "lint",
              count: 111,
            },
            {
              name: "fuzz",
              count: 111,
            },
          ],
          language: [
            {
              name: "english",
              count: 111,
            },
            {
              name: "french",
              count: 22,
            },
            {
              name: "no linguistic content",
              count: 9,
            },
          ],
          literary_form: [
            {
              name: "fiction",
              count: 81,
            },
            {
              name: "nonfiction",
              count: 62,
            },
          ],
        },
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      query: { q: "cheese" },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Results, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/search?q=cheese"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.vm.$data.hits).toBe(2);
      expect(wrapper.text()).toMatch("Source of data");
      expect(wrapper.text()).toMatch("Format");
      expect(wrapper.text()).toMatch("Subject");
      expect(wrapper.text()).toMatch("Author/contributor");
      expect(wrapper.text()).toMatch("Collection");
      expect(wrapper.text()).toMatch("Language");
      expect(wrapper.text()).toMatch("Content type");
      expect(wrapper.text()).toMatch("Literary form");
    });
  });

  it("sets per_page to 20 if nothing is specified or defined", async () => {
    mockResponse = {
      status: 200,
      data: {
        hits: 0,
        results: [],
      },
    };

    axios.get.mockImplementation(() => Promise.reject(mockResponse));

    const mockRoute = {
      query: {
        q: "cheese",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Results, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    delete process.env.VUE_APP_RESULTS_PER_PAGE;

    expect(wrapper.vm.per_page).toEqual(20);
  });

  it("sets per_page based on an env var over the default", async () => {
    mockResponse = {
      status: 200,
      data: {
        hits: 0,
        results: [],
      },
    };

    axios.get.mockImplementation(() => Promise.reject(mockResponse));

    const mockRoute = {
      query: {
        q: "cheese",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Results, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    // We explicitly set this here because we cannot trust what you have set
    // in env.
    process.env.VUE_APP_RESULTS_PER_PAGE = 7;

    expect(wrapper.vm.per_page).toEqual(7);
  });
});
