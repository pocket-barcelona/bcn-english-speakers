export type Barrio = {
  id: number;
  par: number;
  bar: string;
  children?: Barrio[];
};

export const Barrios: Barrio[] = [
  { id: 1, par: 0, bar: "Ciutat Vella" },
  { id: 2, par: 0, bar: "L'Eixample" },
  { id: 3, par: 0, bar: "Sants-Montjuïc" },
  { id: 4, par: 0, bar: "Les Corts" },
  { id: 5, par: 0, bar: "Sarrià-Sant Gervasi" },
  { id: 6, par: 0, bar: "Gràcia" },
  { id: 7, par: 0, bar: "Horta-Guinardó" },
  { id: 8, par: 0, bar: "Nou Barris" },
  { id: 9, par: 0, bar: "Sant Andreu" },
  { id: 10, par: 0, bar: "Sant Martí" },
  { id: 11, par: 1, bar: "El Raval" },
  { id: 12, par: 1, bar: "El Barri Gòtic" },
  { id: 13, par: 1, bar: "El Born" },
  { id: 14, par: 1, bar: "La Barceloneta" },
  { id: 15, par: 2, bar: "L'Antiga Esquerra de l'Eixample" },
  { id: 16, par: 2, bar: "La Nova Esquerra de l'Eixample" },
  { id: 17, par: 2, bar: "La Dreta de l'Eixample" },
  { id: 18, par: 2, bar: "El Fort Pienc" },
  { id: 19, par: 2, bar: "La Sagrada Família" },
  { id: 20, par: 2, bar: "Sant Antoni" },
  { id: 21, par: 3, bar: "La Bordeta" },
  { id: 22, par: 3, bar: "La Font de la Guatlla" },
  { id: 23, par: 3, bar: "Hostafrancs" },
  { id: 24, par: 3, bar: "La Marina de Port" },
  { id: 25, par: 3, bar: "La Marina del Prat Vermell" },
  { id: 26, par: 3, bar: "El Poble-sec" },
  { id: 27, par: 3, bar: "Sants" },
  { id: 28, par: 3, bar: "Sants-Badal" },
  { id: 29, par: 4, bar: "Les Corts" },
  { id: 30, par: 4, bar: "La Maternitat i Sant Ramon" },
  { id: 31, par: 4, bar: "Pedralbes" },
  { id: 32, par: 5, bar: "El Putxet i el Farró" },
  { id: 33, par: 5, bar: "Sarrià" },
  { id: 34, par: 5, bar: "Sant Gervasi - la Bonanova" },
  { id: 35, par: 5, bar: "Sant Gervasi - Galvany" },
  { id: 36, par: 5, bar: "Les Tres Torres" },
  { id: 37, par: 5, bar: "Vallvidrera, el Tibidabo i les Planes" },
  { id: 38, par: 6, bar: "La Vila de Gràcia" },
  { id: 39, par: 6, bar: "El Camp d'en Grassot i Gràcia nova" },
  { id: 40, par: 6, bar: "La Salut" },
  { id: 41, par: 6, bar: "El Coll" },
  { id: 42, par: 6, bar: "Vallcarca i els Penitents" },
  { id: 43, par: 7, bar: "El Baix Guinardó" },
  { id: 44, par: 7, bar: "El Guinardó" },
  { id: 45, par: 7, bar: "Can Baró" },
  { id: 46, par: 7, bar: "El Carmel" },
  { id: 47, par: 7, bar: "La Font d'en Fargues" },
  { id: 48, par: 7, bar: "Horta" },
  { id: 49, par: 7, bar: "La Clota" },
  { id: 50, par: 7, bar: "Montbau" },
  { id: 51, par: 7, bar: "Sant Genís dels Agudells" },
  { id: 52, par: 7, bar: "La Teixonera" },
  { id: 53, par: 7, bar: "La Vall d'Hebron" },
  { id: 54, par: 8, bar: "Can Peguera" },
  { id: 55, par: 8, bar: "Canyelles" },
  { id: 56, par: 8, bar: "Ciutat Meridiana" },
  { id: 57, par: 8, bar: "La Guineueta" },
  { id: 58, par: 8, bar: "Porta" },
  { id: 59, par: 8, bar: "La Prosperitat" },
  { id: 60, par: 8, bar: "Les Roquetes" },
  { id: 61, par: 8, bar: "Torre Baró" },
  { id: 62, par: 8, bar: "La Trinitat Nova" },
  { id: 63, par: 8, bar: "El Turó de La Peira" },
  { id: 64, par: 8, bar: "Vallbona" },
  { id: 65, par: 8, bar: "Verdum" },
  { id: 66, par: 8, bar: "Vilapicina i la Torre Llobeta" },
  { id: 67, par: 9, bar: "Baró de Viver" },
  { id: 68, par: 9, bar: "El Bon Pastor" },
  { id: 69, par: 9, bar: "El Congrés i els Indians" },
  { id: 70, par: 9, bar: "Navas" },
  { id: 71, par: 9, bar: "Sant Andreu de Palomar" },
  { id: 72, par: 9, bar: "La Sagrera" },
  { id: 73, par: 9, bar: "La Trinitat Vella" },
  { id: 74, par: 10, bar: "El Besòs i el Maresme" },
  { id: 75, par: 10, bar: "El Clot" },
  { id: 76, par: 10, bar: "El Camp de l'Arpa del Clot" },
  { id: 77, par: 10, bar: "Diagonal Mar i el Front Marítim del Poblenou" },
  { id: 78, par: 10, bar: "El Parc i la Llacuna del Poblenou" },
  { id: 79, par: 10, bar: "El Poblenou" },
  { id: 80, par: 10, bar: "Provençals del Poblenou" },
  { id: 81, par: 10, bar: "Sant Martí de Provençals" },
  { id: 82, par: 10, bar: "La Verneda i la Pau" },
  { id: 83, par: 10, bar: "La Vila Olímpica del Poblenou" },
];

export const getParentBarrios = () => Barrios.filter((b) => b.par === 0);

export const getBarriosByParent = (par: number) =>
  Barrios.filter((b) => b.par === par);

export const getBarrioById = (id: number) => Barrios.find((b) => b.id === id);

export const searchBarrios = (searchText: string) =>
  Barrios.filter((b) => b.bar.toLowerCase().includes(searchText.toLowerCase()));

export const getAllBarrios = (): Barrio[] => {
  const parents = getParentBarrios();
  const all: Barrio[] = [...parents];
  parents.forEach((p, index) => {
    const children = getBarriosByParent(p.id);
    all[index].children = children;
  });
  return all;
};

// functionalities:
// 1. Search for a barrio by name
// 2. Show all top-level barrios
// 3. Show all sub-barrios for a given top-level barrio
// 4. Show the parent of a given sub-barrio
// FUTURE
// 5. Show all barrios on the map
