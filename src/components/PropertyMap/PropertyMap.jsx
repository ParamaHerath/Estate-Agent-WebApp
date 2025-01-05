// Component for displaying a Google Map with a marker for a property
import { GoogleMap, MarkerF } from '@react-google-maps/api';

function PropertyMap({ coordinates }) {
  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={coordinates}
      zoom={15}
    >
      <MarkerF
        position={coordinates}
      />
    </GoogleMap>
  );
}

export default PropertyMap; 