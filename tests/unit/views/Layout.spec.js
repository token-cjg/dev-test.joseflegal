import { shallowMount, createLocalVue } from "@vue/test-utils";
import Layout from "@/views/Layout.vue";
import FileItem from "@/components/FileItem.vue";
import api from "@/api"; // Adjust this import based on your actual API file's location

// Create a local Vue instance to install plugins if needed (e.g., Vuex, Vue Router)
const localVue = createLocalVue();

// Mocking the FileItem component
jest.mock("@/components/FileItem.vue", () => ({
  name: "FileItem",
  props: ["file"],
  render: (h) => h("div"), // simple render function
}));

// Mocking the API call
jest.mock("@/api", () => ({
  files: {
    get: jest.fn(),
  },
}));

describe("Layout.vue", () => {
  let files;

  beforeEach(() => {
    files = [
      {
        id: "1",
        description: "a fluffy kitten",
        mimetype: "image/jpeg",
        filename: "kitten.jpg",
        tags: "kitten",
        date: "2021-07-01T14:00:00.000+00:00",
        src: "http://placekitten.com/200/300",
      },
      {
        id: "2",
        description: "a tiny puppy",
        mimetype: "image/jpeg",
        filename: "puppy.jpg",
        tags: "puppy",
        date: "2021-08-01T14:00:00.000+00:00",
        src: "http://placepuppy.com/200/300",
      },
    ];

    api.files.get.mockResolvedValue(files);
  });

  it("fetches files on created hook and filters for kittens", async () => {
    const wrapper = shallowMount(Layout, { localVue });
    // Since fetch is async, we need to wait for the next tick to ensure it has completed.
    await wrapper.vm.$nextTick();

    // The component should only render FileItem for files tagged with "kitten"
    expect(wrapper.findAllComponents(FileItem).length).toBe(1);
  });

  it('renders a FileItem for each file with tag "kitten"', async () => {
    const wrapper = shallowMount(Layout, { localVue });
    await wrapper.vm.$nextTick(); // Wait for promises to resolve

    const fileItems = wrapper.findAllComponents(FileItem);
    expect(fileItems.wrappers[0].props().file).toEqual(files[0]); // Check if the first file item receives the correct prop
  });
});
