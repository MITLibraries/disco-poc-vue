import { mount } from "@vue/test-utils";
import axios from "axios";
import Record from "@/views/Record.vue";

var mockResponse = {};

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe("valid id", () => {
  it("loads data", async () => {
    mockResponse = {
      status: 200,
      data: {
        id: "002574584",
        title: "Cheese",
        source: "MIT Aleph",
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      params: {
        recordId: "002574584",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Record, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/record/002574584"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("Cheese");
      expect(wrapper.vm.$data.result.id).toBe("002574584");
      expect(wrapper.vm.$data.result.title).toBe("Cheese");
    });
  });
});

describe("invalid id", () => {
  it("displays 404", async () => {
    mockResponse = {
      response: {
        status: 404,
        statusText: "Not Found",
        data: {
          error: "record not found",
        },
      },
    };

    axios.get.mockImplementation(() => Promise.reject(mockResponse));

    const mockRoute = {
      params: {
        recordId: "asdf",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Record, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/record/asdf"
    );

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("The requested record was not found.");
    });
  });
});

describe("non 404 error", () => {
  it("displays unknown error", async () => {
    mockResponse = {
      response: {
        status: 500,
        statusText: "Internal Server Error",
      },
    };

    axios.get.mockImplementation(() => Promise.reject(mockResponse));

    const mockRoute = {
      params: {
        recordId: "asdf",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Record, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/record/asdf"
    );

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("An unknown error occured.");
    });
  });
});

describe("sparsest valid timdex record", () => {
  it("doesn't error on any non-provided fields", async () => {
    mockResponse = {
      status: 200,
      data: {
        id: "002574584",
        title: "Cheese",
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      params: {
        recordId: "002574584",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Record, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/record/002574584"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("Cheese");
      expect(wrapper.vm.$data.result.id).toBe("002574584");
      expect(wrapper.vm.$data.result.title).toBe("Cheese");
    });
  });
});

describe("invalid timdex record", () => {
  it("displays what it can", async () => {
    mockResponse = {
      status: 200,
      data: {
        languages: ["English"],
        physical_description: "Dusty old box of cheese",
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      params: {
        recordId: "002574584",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Record, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/record/002574584"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("Unknown title");
      expect(wrapper.text()).toMatch("English");
      expect(wrapper.text()).toMatch("Dusty old box of cheese");
      expect(wrapper.vm.$data.result.title).toBeNull;
    });
  });
});

describe("record metadata display", () => {
  it("normalizes MIT Aleph source to MIT Barton Catalog", async () => {
    mockResponse = {
      status: 200,
      data: {
        id: "002574584",
        title: "Cheese",
        source: "MIT Aleph",
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      params: {
        recordId: "002574584",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Record, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/record/002574584"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("Database: MIT Barton Catalog");
    });
  });

  it("does not attempt to normalize DSpace@MIT source", async () => {
    mockResponse = {
      status: 200,
      data: {
        id: "002574584",
        title: "Cheese",
        source: "DSpace@MIT",
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      params: {
        recordId: "002574584",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Record, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/record/002574584"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("Database: DSpace@MIT");
    });
  });

  it("does not attempt to normalize MIT ArchivesSpace source", async () => {
    mockResponse = {
      status: 200,
      data: {
        id: "002574584",
        title: "Cheese",
        source: "MIT ArchivesSpace",
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockResponse));

    const mockRoute = {
      params: {
        recordId: "002574584",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Record, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(axios.get).toHaveBeenCalledWith(
      "https://timdex.example.com/api/v1/record/002574584"
    );

    expect(wrapper.vm.$data.status.loading).toBe(true);

    await wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$data.status.loading).toBe(false);
      expect(wrapper.text()).toMatch("Database: MIT ArchivesSpace");
    });
  });
});
