import React from 'react';
import PropTypes from 'prop-types'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapComponent = (props) => {
  function loadMarkers() {
    return props.locations.map((location, index) => {
      return <Marker key={index} id={index} position={{
        lat: location.lat,
        lng: location.lng
      }}
        onClick={updateLocations} />
    })
  }

  function updateLocations() {
    props.update(props.locations);
  }

  return (
    <Map
      google={props.google}
      className='map-container'
      style={mapStyles}
      initialCenters={{ lat: 52.520008, lng: 13.404954 }}
      center={props.activeMarkerValues}
    >
      {loadMarkers()}
    </Map>
  );
}

MapComponent.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  })).isRequired,
  activeMarkerValues: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  update: PropTypes.func.isRequired
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY
})(MapComponent);
