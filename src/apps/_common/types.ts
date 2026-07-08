import type { HeadlessPlace } from "../../lib/directus";

export interface PageContext {
  pageContext: {
    places?: HeadlessPlace[];
  }
};
