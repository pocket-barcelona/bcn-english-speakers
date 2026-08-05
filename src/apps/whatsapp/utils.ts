import { FAKE_LINK } from "./data";

export const interpolateTemplate = (copy: string, link?: string) => {
  return copy.replace("{link}", link || FAKE_LINK);
};

// interpolateTemplate function to support an array of links in copy where link = ["link1", "link2"]
export const interpolateTemplateMultiple = (copy: string, links?: string[]) => {
  let newCopy = copy;
  links?.forEach((link) => {
    newCopy = newCopy.replace("{link}", link);
  });
  return newCopy;
};
