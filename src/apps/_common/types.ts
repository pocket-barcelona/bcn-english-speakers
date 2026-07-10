import type { Barrio } from "../../data/apps/barrios";
import type { HeadlessPlace } from "../../lib/directus";

export interface PageContext {
  places?: HeadlessPlace[];
  barrios: Barrio[];
};
