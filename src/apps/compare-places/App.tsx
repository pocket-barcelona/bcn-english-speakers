import type { PageContext } from '../_common/types';

interface Props extends PageContext {};

export default function App({ pageContext }: Props) {
  const { places } = pageContext;

  if (!places || places.length === 0) {
    return <div class="text-center text-lg">No places available.</div>;
  }

  return (
    <div>
      {places.map((place) => (
        <div key={place.placeId}>
          <h2>{place.labelCat}</h2>
          <p>{place.description}</p>
        </div>
      ))}
    </div>
  );
}
