import React, { Component } from 'react';
import LocationDetials from './LocationDetials'
import axios from 'axios';
import PropTypes from 'prop-types';

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.curLocation,
            searchValue: props.curLocation.name,
            disableBtn: true,
            noGeoData: false,
            disableGeoBtn: true,
            isDuplicate: false
        };
        this.addMapLocation = this.addMapLocation.bind(this);
        this.editMapLocation = this.editMapLocation.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.getGeoCordiantes = this.getGeoCordiantes.bind(this);
    }

    searchChange(event) {
        let disableGeoBtn = true;
        if ((this.props.modalName === "Add" && event.target.value) || (this.props.modalName === "Edit" && event.target.value && event.target.value !== this.state.searchValue))
            disableGeoBtn = false;
        this.setState({ searchValue: event.target.value, hasError: false, disableGeoBtn });
    }

    addMapLocation() {
        axios.post('http://localhost:4000/createMarker', this.state.location, { headers: { "Access-Control-Allow-Origin": "*" } })
            .then(res => {
                this.setState({ hasError: false });
                this.props.toggle(res.data.location);
            })
            .catch(error => {
                console.log(error);
                this.setState({ hasError: true });
            })
    }

    editMapLocation() {
        axios.put(`http://localhost:4000/editMarker/${this.props.curLocation._id}`, this.state.location, { headers: { "Access-Control-Allow-Origin": "*" } })
            .then(res => {
                let location = { ...this.props.curLocation };
                location.name = this.state.location.name;
                location.lat = this.state.location.lat;
                location.lng = this.state.location.lng;
                this.setState({ hasError: false });
                this.props.toggle(location);
            })
            .catch(error => {
                console.log(error);
                this.setState({ hasError: true });
            })
    }

    getGeoCordiantes() {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.searchValue}&key=${process.env.REACT_APP_MAPS_API_KEY}`)
            .then(res => {
                const data = res.data;
                if (data.results.length > 0) {
                    let filterArr = this.props.locations.filter((obj) => obj.name === data.results[0].formatted_address);
                    if (data.results[0].formatted_address === this.props.curLocation.name) {
                        this.setState({ disableGeoBtn: true, noGeoData: false });
                    } else if (filterArr.length > 0) {
                        this.setState({ isDuplicate: true, noGeoData: false });
                    } else {
                        this.setState({
                            location: {
                                name: data.results[0].formatted_address,
                                lat: data.results[0].geometry.location.lat,
                                lng: data.results[0].geometry.location.lng,
                            },
                            noGeoData: false,
                            disableBtn: false,
                            isDuplicate: false
                        });
                    }
                } else {
                    this.setState({
                        noGeoData: true,
                        isDuplicate: false
                    });
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ hasError: true, disableBtn: true, isDuplicate: false });
            })
    }

    render() {
        return (
            <div
                className="modal show"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                style={{ display: "block" }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{this.props.modalName} Marker</h3>
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={this.props.toggleClose}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input name="searchInput" type="text" className="form-control" placeholder="Type Place" value={this.state.searchValue} onChange={this.searchChange} />
                                </div>
                                <button type="button" className="btn btn-primary geo-btn" disabled={this.state.disableGeoBtn} onClick={this.getGeoCordiantes}>
                                    Get Geo Cordinates</button>
                            </form>
                            {(this.state.location.name) ?
                                <LocationDetials location={this.state.location} /> : null}
                            {(this.state.noGeoData) ? (<div className="error-msg locations">
                                No locations found.
                                    </div>) : null
                            }
                            {(this.state.hasError) ?
                                <div className="error-msg">Something went wrong. Please try agian later.</div> : null}
                            {(this.state.isDuplicate) ?
                                <div className="error-msg exists">Marker already exists there.</div> : null}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.props.toggleClose}>
                                Close</button>
                            <button type="button" className="btn btn-primary" disabled={this.state.disableBtn} onClick={(this.props.modalName === "Add") ? this.addMapLocation : this.editMapLocation}>
                                {this.props.modalName}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


AddModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    toggleClose: PropTypes.func.isRequired,
    modalName: PropTypes.string.isRequired,
    curLocation: PropTypes.shape({
        name: PropTypes.string,
        lat: PropTypes.number,
        lng: PropTypes.number
    }).isRequired,
    locations: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    })).isRequired,
}

export default AddModal;