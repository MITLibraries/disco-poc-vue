import { mount } from "@vue/test-utils";
import NotFound from "@/views/NotFound";

afterEach(() => {
  jest.clearAllMocks();
});

describe("NotFound.vue", () => {
  it("displays custom 404 page", async () => {
    const mockRoute = {
      params: {
        name: "flerb",
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(NotFound, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(wrapper.text()).toMatch("Oops! The requested page was not found.");
  });
});
