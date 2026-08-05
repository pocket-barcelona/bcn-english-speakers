import { useEffect } from "preact/hooks";
import type { PlaceType } from "../../types";

type MapProps = {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  points?: google.maps.LatLngLiteral[];
  polygons?: google.maps.PolygonOptions[];
};

export default function GoogleMap({ center, zoom }: MapProps) {
  const mapCenter: string = center
    ? `${center.lat}, ${center.lng}`
    : "41.38703093661932, 2.170055707928692"; // plaza cat
  const mapZoom: number = zoom ?? 15;

  const items = [
    {
      position: { lat: 41.38703093661932, lng: 2.170055707928692 },
      title: "Plaza Catalunya",
    },
    {
      position: { lat: 41.385323, lng: 2.173788 },
      title: "Casa del Llibre",
    },
  ];

  useEffect(() => {
    const mapElement = document.querySelector("gmp-map")!;
    const dataPointsString = mapElement.dataset.points;
    const dataPoints = JSON.parse(dataPointsString!) as PlaceType[];
    
    const init = async () => {
      // Request needed libraries.
      const [{ InfoWindow }, { AdvancedMarkerElement, PinElement }] =
        await Promise.all([
          google.maps.importLibrary("maps"),
          google.maps.importLibrary("marker"),
        ]);

      // Set LatLng and title text for the markers. The first marker (Boynton Pass)
      // receives the initial focus when tab is pressed. Use arrow keys to move
      // between markers; press tab again to cycle through the map controls.
      const mapMarkers = dataPoints
        .filter((i) => i.lat && i.lng && i.placeName)
        .map((i) => {
          return {
            position: { lat: i.lat, lng: i.lng },
            title: i.placeName,
          };
        });

      // Create an info window to share between markers.
      const infoWindow = new InfoWindow();

      // Create the markers.
      mapMarkers.forEach(({ position, title }, i) => {
        const pin = new PinElement({
          glyphText: `${i + 1}`,
          scale: 1.5,
        });
        const marker = new AdvancedMarkerElement({
          position,
          title: `${i + 1}. ${title}`,
          gmpClickable: true,
        });
        marker.append(pin);
        mapElement.append(marker);
        // Add a click listener for each marker, and set up the info window.
        marker.addEventListener("gmp-click", () => {
          infoWindow.close();
          infoWindow.setContent(marker.title);
          infoWindow.open(marker.map, marker);
        });
      });


      // Polygons
      // Define the LatLng coordinates for the polygon's path.
      const triangleCoords = [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
        { lat: 25.774, lng: -80.19 },
      ];

      // Construct the polygon.
      const bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });

      bermudaTriangle.setMap(mapElement.innerMap);
    };
    
    (async () => { init(); })();

  }, []);
  return (
    <div>
      <h2>Map view</h2>
      <gmp-map
        center={mapCenter}
        zoom={mapZoom}
        map-id="MY_MAP_ID"
        data-points={JSON.stringify(items ?? [])}
        class="h-100 md:h-120"
      />
    </div>
  );
}
