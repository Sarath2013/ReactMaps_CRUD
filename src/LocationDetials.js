import React from 'react';
import PropTypes from 'prop-types'

const LocationDetials = (props) => {
  return (
    <div>
      <div className='loc-title'>{props.location.name}</div>
      <div className='loc-name'>{props.location.name}</div>
      <div className='loc-lat'>latitude: {props.location.lat}</div>
      <div className='loc-lng'>longitude: {props.location.lng}</div>
    </div>
  );
}

LocationDetials.propTypes = {
  location: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
}

export default LocationDetials;