type AppItem = {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};
const apps: AppItem[] = [
  {
    id: "barrio-lookup",
    title: "Barrio Lookup",
    description: "Show me information about a neighbourhood",
    image: {
      src: "barrios.jpg",
      alt: "barrios",
    },
  },
  {
    id: "all-beaches",
    title: "All Beaches",
    description: "Show me all beaches in Barcelona on a map",
    image: {
      src: "beaches.jpg",
      alt: "beaches",
    },
  },
];

export const getAppById = (id: AppItem["id"]): AppItem | undefined => {
  return apps.find((app) => app.id === id);
};

export default apps;