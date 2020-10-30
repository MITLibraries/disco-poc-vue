import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { flushPromises, mount } from "@vue/test-utils";
import Record from "@/components/Record.vue";
import { nextTick } from "vue";

describe("record view", () => {
  var instance;
  var mock;

  beforeEach(function() {
    instance = axios.create();
    mock = new MockAdapter(instance);
  });

  it("does stuff", () => {
    const mockRoute = {
      params: {
        recordId: "002574584"
      }
    };
    const mockRouter = {
      push: jest.fn()
    };
    const wrapper = mount(Record, {
      props: {},
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    });

    mock
      .onGet("https://timdex.mit.edu/api/v1/record/002574584")
      .reply(function() {
        return new Promise(function(resolve) {
          resolve({
            status: 200,
            data: {
              id: "002574584",
              title: "Cheese",
              source: "MIT Aleph"
            }
          });
        });
      });

    // expect(wrapper.vm.$data.status.loading).toBe(false);

    expect(wrapper.text()).toMatch("Cheese");
  });

  // it("allows resolving with Promise", function() {
  // mock.onGet("https://timdex.mit.edu/api/v1/record/123123").reply(function() {
  //   return new Promise(function(resolve) {
  //     resolve([
  //       200,
  //       {
  //         hits: 42,
  //         results: []
  //       }
  //     ]);
  //   });
  // });

  // return instance.get("/record/123123").then(function(response) {
  //   expect(wrapper.vm.html()).toMatch("Cheese");
  // });
  // });
});
