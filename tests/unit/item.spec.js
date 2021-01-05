import { mount, RouterLinkStub } from "@vue/test-utils";
import Item from "@/components/Item.vue";

describe("Item.vue", () => {
  it("renders props.result.title when passed", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      content_type: "Book",
      contributors: [
        {
          kind: "author",
          value: "John William De Forest",
        },
      ],
      publication_date: "1868",
      source_link: "http://library.mit.edu/item/000544411",
      subjects: ["fiction"],
    };
    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch(result.title);
    expect(wrapper.text()).toMatch(result.content_type);
    expect(wrapper.text()).toMatch(result.contributors[0].value);
    expect(wrapper.text()).toMatch(result.publication_date);
    expect(wrapper.html()).toMatch(result.source_link);
    expect(wrapper.text()).toMatch(result.subjects[0]);
  });

  it("does not error when non-required elements are missing", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
    };
    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.html()).toMatch(result.title);
  });

  it("does not show link to source if not provided", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {};
    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).not.toMatch("View in");
  });

  it("uses source if present for link", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      source_link: "http://library.mit.edu/item/000544411",
      source: "Super cool source",
    };

    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch("View in Super cool source");
    expect(wrapper.html()).toMatch(result.source_link);
  });

  it("uses generic source if not present for link", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      source_link: "http://library.mit.edu/item/000544411",
    };

    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch("View in source");
    expect(wrapper.html()).toMatch(result.source_link);
  });

  it("displays subjects if present", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      source_link: "http://library.mit.edu/item/000544411",
      subjects: ["Things made of cheese", "Wisconsin -- History -- Cheese"],
    };

    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch("Things made of cheese");
    expect(wrapper.text()).toMatch("Wisconsin -- History -- Cheese");
  });

  it("displays authors if present", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      source_link: "http://library.mit.edu/item/000544411",
      contributors: [
        { value: "Lastoson, Firsty", kind: "Creator" },
        {
          value: "Namenamenamename",
          kind: "Assistant to the Regional Manager",
        },
      ],
    };

    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch("Lastoson, Firsty (Creator)");
    expect(wrapper.text()).toMatch(
      "Namenamenamename (Assistant to the Regional Manager)"
    );
  });

  it("displays authors generic kind if not provided", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      source_link: "http://library.mit.edu/item/000544411",
      contributors: [
        { value: "Lastoson, Firsty", kind: "Creator" },
        { value: "Namenamenamename" },
      ],
    };

    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch("Lastoson, Firsty (Creator)");
    expect(wrapper.text()).toMatch("Namenamenamename (contributor)");
  });

  it("normalizes MIT Aleph source to MIT Barton Catalog", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      source: "MIT Aleph",
      source_link: "http://library.mit.edu/item/000544411",
    };

    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch("MIT Barton Catalog");
  });

  it("does not attempt to normalize DSpace@MIT source", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      source: "DSpace@MIT",
      source_link: "http://library.mit.edu/item/000544411",
    };

    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch("DSpace@MIT");
  });

  it("does not attempt to normalize MIT ArchivesSpace source", () => {
    const $router = {
      push: jest.fn(),
    };
    const $route = {
      params: {
        recordId: "000544411",
      },
    };

    const result = {
      title: "The great American novel",
      source: "MIT ArchivesSpace",
      source_link: "http://library.mit.edu/item/000544411",
    };

    const wrapper = mount(Item, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
        mocks: { $route, $router },
      },
      props: { result },
    });
    expect(wrapper.text()).toMatch("MIT ArchivesSpace");
  });
});
