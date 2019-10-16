import React, { PureComponent } from 'react';
import LocationDetials from './LocationDetials'
import AddModal from './AddModal';
import axios from 'axios';
import PropTypes from 'prop-types';

class CrudView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showAddModal: false, modalName: '', curLocation: {}, activeEditIndex: undefined, hasError: false };
    this.updateLocations = this.updateLocations.bind(this);
    this.loadMarkers = this.loadMarkers.bind(this);
    this.toggleAddOpen = this.toggleAddOpen.bind(this);
    this.toggleEditOpen = this.toggleEditOpen.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.toggleAddEditComplete = this.toggleAddEditComplete.bind(this);
    this.toggleAddEditClose = this.toggleAddEditClose.bind(this);
    this.viewMaker = this.viewMaker.bind(this);
  }

  loadMarkers() {
    return (this.props.locations.length > 0) ? (this.props.locations.map((location, index) => {
      return <div className="col-md-6 col-sm-12 col-xs-12 loc-details" key={index}>
        <LocationDetials location={location} />
        <div className='loc-actions'>
          <div className="view-marker"><button className="btn btn-default" onClick={() => this.viewMaker(index)}>View Marker</button></div>
          <span><button className="btn btn-default" onClick={() => this.toggleEditOpen(index)}>Edit</button></span>
          <span>or</span>
          <span><button className="btn btn-default" onClick={() => this.deleteLocation(index)}>Delete</button></span>
          {(this.state.hasError) ?
            <div className="error-msg">Something went wrong. Please try agian later.</div> : null}
        </div>
      </div>
    })) : <div className="no-markers"><h6>No markers to show. Please add markers</h6></div>;
  }

  updateLocations() {
    this.props.update(this.props.locations);
  }

  toggleAddOpen() {
    this.setState({ showAddModal: !this.state.showAddModal, modalName: 'Add', curLocation: { name: '' }, activeEditIndex: undefined });
  }

  toggleAddEditComplete(data) {
    let locations, activeValues = data;
    if (this.state.activeEditIndex >= 0) {
      locations = [...this.props.locations];
      locations[this.state.activeEditIndex] = data;
    }
    else
      locations = [...this.props.locations, data];
    this.setState({ showAddModal: !this.state.showAddModal, curLocation: {}, activeEditIndex: undefined });
    this.props.update(locations, activeValues);
  }

  toggleAddEditClose(data) {
    this.setState({ showAddModal: !this.state.showAddModal, curLocation: {}, activeEditIndex: undefined });
  }

  viewMaker(index) {
    let curLocation = this.props.locations[index];
    this.props.update(this.props.locations, curLocation);
  }

  toggleEditOpen(index) {
    let curLocation = this.props.locations[index];
    this.setState({ showAddModal: !this.state.showAddModal, modalName: 'Edit', curLocation, activeEditIndex: index });
  }

  deleteLocation(index) {
    let locations = [...this.props.locations];
    locations.splice(index, 1);
    axios.delete(`http://localhost:4000/deleteMarker/${this.props.locations[index]._id}`, { headers: { "Access-Control-Allow-Origin": "*" } })
      .then(res => {
        this.props.update(locations);
      })
      .catch(error => {
        console.log(error);
        this.setState({ hasError: true });
      })
  }

  render() {
    return (
      <div className="contianer">
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={this.toggleAddOpen} >Add Map</button>
          </div>
        </div>
        <hr />
        <div className="row">
          {this.loadMarkers()}
        </div>
        {
          this.state.showAddModal ? (<div className="add-modal-container"><AddModal toggle={this.toggleAddEditComplete} toggleClose={this.toggleAddEditClose} modalName={this.state.modalName} curLocation={this.state.curLocation} locations={this.props.locations} />
            <div className="modal-backdrop show"></div></div>
          ) : null
        }
      </div>
    );
  }
}

CrudView.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  })).isRequired,
  update: PropTypes.func.isRequired
}

export default CrudView;