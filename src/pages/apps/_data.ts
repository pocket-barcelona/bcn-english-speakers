import imageBarrios from '../../assets/apps/barrios.jpg';
import imageBeaches from '../../assets/apps/beaches.jpg';
import blankImage from '../../assets/apps/blank.jpg';
import imageCompareAttractions from '../../assets/apps/compare-attractions.jpg';
import imageMapsExport from '../../assets/apps/maps-export.jpg';
import imagePintCalculator from '../../assets/apps/pint-calculator.jpg';
import imageWhatsappRecommendations from '../../assets/apps/whatsapp-recommendations.jpg';

type AppItem = {
  id: string;
  active?: boolean;
  title: string;
  category: 'maps' | 'tools' | 'languages' | 'games';
  description: string;
  image: ImageMetadata;
};
const apps: AppItem[] = [
  {
    id: 'compare-places',
    active: true,
    category: 'maps',
    title: 'Compare tourist attractions', // see Spotify DNA screenshot 5th June
    description: 'Compare 2 Barcelona tourist attractions and decide which one to go to',
    image: imageCompareAttractions,
  },
  {
    id: 'whatsapp-recommendations',
    category: 'tools',
    title: 'WhatsApp recommendations',
    description:
      'Create a beautifully formatted WhatsApp message of place/restaurant/bar recommendations to send to friends',
    image: imageWhatsappRecommendations,
  },
  {
    id: 'barrio-lookup',
    category: 'maps',
    title: 'Barrio look-up',
    description: 'Show me information about any Barcelona neighbourhood and see all barrios outlined on a map',
    image: imageBarrios,
  },
  {
    id: 'google-takeout-exporter',
    category: 'maps',
    title: 'Google Maps locations exporter',
    description:
      'Convert a Google Takeout JSON export into a useful list, filter by Barcelona and give me useful insights',
    image: imageMapsExport,
  },
  {
    id: 'all-beaches',
    category: 'maps',
    title: 'All the beaches',
    description: 'Show me all the beaches in Barcelona on a simple map',
    image: imageBeaches,
  },
  {
    id: 'beer-calculator',
    category: 'tools',
    title: 'Is my drink worth it?',
    description:
      'Convert your Barcelona beer to pints/pounds to see if it is more or less than what you pay back home',
    image: imagePintCalculator,
  },
  {
    id: 'adjective-lookup',
    category: 'languages',
    title: 'List nearly all adjectives in Spanish and English',
    description: '',
    image: blankImage,
  },
  {
    id: 'missed-festival',
    category: 'tools',
    title: 'Missed Festa Major',
    description: 'Did you just miss a major firework display? Find out which local festival you just missed, based on your location and historical event data',
    image: blankImage,
  },
  {
    id: 'vocab-tester-meat',
    category: 'games',
    title: 'Test your market knowledge in Spanish, Catalan and English',
    description: 'Are you tired of mixing up your merluza from your lenguado, or your pollastre from your pavo? This game is for you!',
    image: blankImage,
  }, // todo - one for fish, fruits, veg, pulses... // use Google sheets vocab list for others:
  {
    id: 'attraction-game',
    category: 'games',
    title: 'Barcelona tourist attraction quiz',
    description: 'Do you think you know your Barcelona tourist attractions? Take this quiz now...',
    image: blankImage,
  },


  // {
  //   id: "ping-pong-tables",
  //   active: false,
  //   category: "maps",
  //   title: "Ping pong tables",
  //   description: "Find all ping pong tables and clubs in Barcelona",
  //   image: {
  //     src: blankImage.src,
  //     alt: "ping pong tables",
  //   },
  // },
];

export const getAppById = (id: AppItem['id']): AppItem | undefined => {
  return apps.find((app) => app.id === id);
};

export default apps;
