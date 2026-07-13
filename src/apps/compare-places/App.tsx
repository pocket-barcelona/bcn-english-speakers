import { useState } from "preact/hooks";
import Combobox, { type ComboboxValue } from "../../components/ui/combobox";
import type { HeadlessPlace } from "../../lib/directus";
import {
  getPlaceholderImage,
  getPlaceImage,
} from "../../services/place.service";
import type { PageContext } from "../_common/types";

interface Props extends PageContext {}

export default function App({ places = [] }: Props) {
  const [selected, setSelected] = useState<Array<HeadlessPlace | null>>([
    null,
    null,
  ]);

  // filter for things in Barcelona and not outside
  const placesData = places
    .filter((p) => p.barrioId !== 86)
    .map((place) => ({
      label: place.labelCat,
      value: place.placeId.toString(),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  if (!places || places.length === 0) {
    return <div class="text-center text-lg">No places available.</div>;
  }

  const getPlaceById = (id: string) => {
    return places.find((place) => place.placeId.toString() === id);
  };

  const handleValueChange = (
    placeNumber: number,
    value: ComboboxValue | null,
  ) => {
    const place = value
      ? ((getPlaceById(value.value) as HeadlessPlace) ?? null)
      : null;
    setSelected((prev) => {
      const newSelected = [...prev];
      newSelected[placeNumber] = place;
      return newSelected;
    });
  };

  const card1 = selected[0] !== null ? selected[0] : null;
  const card2 = selected[1] !== null ? selected[1] : null;

  return (
    <div class="dark:bg-slate-900 not-dark:bg-amber-50 not-prose max-w-3xl mx-auto my-4">
      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-4">
          <Combobox
            items={placesData}
            onValueChange={(newValue) => handleValueChange(0, newValue)}
            label="Choose place 1"
          />
          <Card place={card1} />
        </div>
        <div class="flex flex-col gap-4">
          <Combobox
            items={placesData}
            onValueChange={(newValue) => handleValueChange(1, newValue)}
            label="Choose place 2"
          />
          <Card place={card2} />
        </div>
      </div>
      <Comparison place1={card1} place2={card2} />
    </div>
  );
}

function Card({ place }: { place: HeadlessPlace | null }) {
  const placeImage =
    getPlaceImage(place?.images ?? [], "medium") ||
    getPlaceholderImage("small");

  return (
    <article
      class="relative rounded-3xl overflow-hidden flex flex-col items-stretch justify-end min-h-80 bg-cover bg-center"
      style={{
        backgroundImage: place ? `url(${placeImage})` : "none",
        backgroundColor: place ? "transparent" : "bg-slate-800",
      }}
    >
      {place ? (
        <>
          <div class="absolute bottom-0 w-full h-40 bg-linear-to-b from-transparent to-black z-0"></div>
          <div class="p-4 bg-transparent text-white relative not-prose">
            <h2 class="text-lg font-bold text-white">{place.labelCat}</h2>
            <p class="text-sm tracking-normal leading-normal line-clamp-5">
              {place.description}
            </p>
          </div>
        </>
      ) : (
        <div class="rounded-3xl flex items-center justify-center text-white h-full border-4 border-dashed border-neutral-500">
          <p>Select a place</p>
        </div>
      )}
    </article>
  );
}

function Comparison({
  place1,
  place2,
}: {
  place1: HeadlessPlace | null;
  place2: HeadlessPlace | null;
}) {
  if (!place1 || !place2) return null;
  const place1MetroZone =
    place1.metroZone <= 0 ? "Not in Barcelona" : place1.metroZone.toString();
  const place2MetroZone =
    place2.metroZone <= 0 ? "Not in Barcelona" : place2.metroZone.toString();

  // prettier-ignore
  const items: Array<{ title: string; value1: string; value2: string }> = [
    { title: '📍 Barrio', value1: place1.barrio.officialName, value2: place2.barrio.officialName },
    { title: '🎫 Type/Category', value1: place1.category.value, value2: place2.category.value },
    { title: '🌍 Town', value1: place1.town, value2: place2.town },
    { title: '🚇 Metro Zone', value1: place1MetroZone, value2: place2MetroZone },
    { title: '🎟️ Booking required', value1: place1.metrics.booking.join(', '), value2: place2.metrics.booking.join(', ') },
    { title: '⏱️ Day trip required', value1: place1.daytrip ? 'Yes' : 'No', value2: place2.daytrip ? 'Yes' : 'No' },
    { title: '💶 Price', value1: place1.metrics.price.join(', '), value2: place2.metrics.price.join(', ') },
    { title: '🎯 Physical commitment required to visit', value1: place1.metrics.commitmentRequired.join(', '), value2: place2.metrics.commitmentRequired.join(', ') },
    { title: '🎯 Recommended time to spend at place', value1: place1.metrics.timeRecommended.join(', '), value2: place2.metrics.timeRecommended.join(', ') },
    { title: '🌓 Best time of day to visit', value1: place1.metrics.bestTod.join(', '), value2: place2.metrics.bestTod.join(', ') },
    { title: '❤️ Free to visit', value1: place1.freeToVisit ? 'Yes' : 'No', value2: place2.freeToVisit ? 'Yes' : 'No' }, // TODO...
    { title: '📅 Seasonal', value1: place1.seasonal ? 'Yes' : 'No', value2: place2.seasonal ? 'Yes' : 'No' },
    { title: '🎯 Tourist Attraction', value1: place1.touristAttraction ? 'Yes' : 'No', value2: place2.touristAttraction ? 'Yes' : 'No' },
    { title: '👨‍👩‍👧‍👦 Suitable for children/parents', value1: place1.metrics.childrenSuitability.join(', '), value2: place2.metrics.childrenSuitability.join(', ') },
    { title: '💁‍♂️ Suitable for teenagers', value1: place1.metrics.teenagerSuitability.join(', '), value2: place2.metrics.teenagerSuitability.join(', ') },
    // { title: '📏 Distance', value1: '0.5km', value2: '1.2km' },
  ]

  return (
    <div class="p-4 grid grid-cols-2 gap-2 text-white">
      {items.map((item) => (
        <ComparisonItem
          title={item.title}
          value1={item.value1}
          value2={item.value2}
        />
      ))}
    </div>
  );
}

type ComparisonProps = {
  title: string;
  value1: string | number | undefined;
  value2: string | number | undefined;
};
function ComparisonItem({ title, value1, value2 }: ComparisonProps) {
  if (value1 === undefined || value2 === undefined) return null;
  const isSame = value1 === value2;
  return (
    <>
      <div class="col-span-2 border-b border-t border-dashed border-slate-400">
        <h2 class="text-lg text-white font-semibold text-center">{title}</h2>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-sm">{value1}</p>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-sm my-0 text-right">
          {value2} {isSame ? "(Same)" : ""}
        </p>
      </div>
    </>
  );
}
