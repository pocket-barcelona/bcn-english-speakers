type AppItem = {
  id: string;
  active?: boolean;
  title: string;
  category: 'maps' | 'tools' | 'languages'
  description: string;
  image: {
    src: string;
    alt: string;
  };
};
const apps: AppItem[] = [
  {
    id: "barrio-lookup",
    category: "maps",
    title: "Barrio look-up",
    description: "Show me information about any Barcelona neighbourhood",
    image: {
      src: "barrios.jpg",
      alt: "barrios",
    },
  },
  {
    id: "google-takeout-exporter",
    category: "maps",
    title: "Google Maps locations exported",
    description: "Convert a Google Takeout JSON export into a useful list, filter by Barcelona and give me useful insights",
    image: {
      src: "google-takeout.jpg",
      alt: "google",
    },
  },
  {
    id: "all-beaches",
    category: "maps",
    title: "All the beaches",
    description: "Show me all the beaches in Barcelona on a simple map",
    image: {
      src: "beaches.jpg",
      alt: "beaches",
    },
  },
  {
    id: "whatsapp-recommendations",
    category: "tools",
    title: "WhatsApp recommendations",
    description: "Create a beautifully formatted WhatsApp message of place/restaurant/bar recommendations to send to friends",
    image: {
      src: "whatsapp-recommendations.jpg",
      alt: "Whatsapp recommendations",
    },
  },
  {
    id: "beer-calculator",
    category: "tools",
    title: "Is my drink worth it?",
    description: "Convert your Barcelona beer to pints/pounds to see if it is more or less than what you pay back home",
    image: {
      src: "beer-calculator.jpg",
      alt: "beer calculator",
    },
  },
  {
    id: "adjective-lookup",
    category: "languages",
    title: "List nearly all adjectives in Spanish and English",
    description: "",
    image: {
      src: "adjective-lookup.jpg",
      alt: "adjective lookup",
    },
  },

  // what fireworks did I hear last night? (input: your location)
  
  {
    id: "ping-pong-tables",
    active: false,
    category: "maps",
    title: "Ping pong tables",
    description: "Find all ping pong tables and clubs in Barcelona",
    image: {
      src: "ping-pong-tables.jpg",
      alt: "ping pong tables",
    },
  },
  {
    id: "compare-places",
    active: true,
    category: "maps",
    title: "Compare tourist attractions", // see Spotify DNA screenshot 5th June
    description: "Compare 2 Barcelona tourist attractions and decide which one to go to",
    image: {
      src: "compare-places.jpg",
      alt: "compare places",
    },
  },
];

export const getAppById = (id: AppItem["id"]): AppItem | undefined => {
  return apps.find((app) => app.id === id);
};

export default apps;