import { shallowMount } from "@vue/test-utils";
import FileItem from "@/components/FileItem.vue";

describe("FileItem.vue", () => {
  let wrapper;
  const file = {
    id: "6eb00541-1fd5-4779-a155-ba0e53e0fabc",
    description: "A kitten that is 200x300",
    filename: "kitten.jpg",
    mimetype: "image/jpg",
    tags: "kitten",
    date: "2001-07-01T14:00:00.000+00:00",
    src: "http://placekitten.com/200/300",
  };

  beforeEach(() => {
    wrapper = shallowMount(FileItem, {
      propsData: { file },
    });
  });

  it("renders an image with the correct src, alt, and title attributes", () => {
    const image = wrapper.find("img");
    expect(image.exists()).toBe(true);
    expect(image.attributes("src")).toBe(file.src);
    expect(image.attributes("alt")).toBe(file.description);
    expect(image.attributes("title")).toBe(file.filename);
  });

  it("displays the file description below the image", () => {
    expect(wrapper.text()).toContain(file.description);
  });
});
