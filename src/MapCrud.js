import React, { Component } from 'react';
import MapView from './MapView';
import CrudView from './CrudView';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary'

class MapCrud extends Component {
    constructor(props) {
        super(props);
        this.state = { locations: [], activeMarkerValues: { lat: 52.520008, lng: 13.404954 }, hasError: false };
        this.updateLocations = this.updateLocations.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/getMarkers', { headers: { "Access-Control-Allow-Origin": "*" } })
            .then(res => {
                this.setState({ locations: res.data.locations, hasError: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ locations: [], hasError: true });
            })
    }

    updateLocations(data, activeValues) {
        if (activeValues)
            this.setState({ locations: data, activeMarkerValues: { lat: activeValues.lat, lng: activeValues.lng } });
        else
            this.setState({ locations: data, activeMarkerValues: { lat: 52.520008, lng: 13.404954 } });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-12 col-xs-12 map-view">
                        <ErrorBoundary>
                            <MapView locations={this.state.locations} update={this.updateLocations} activeMarkerValues={this.state.activeMarkerValues} />
                        </ErrorBoundary>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 crud-view">
                        {(!this.state.hasError) ?
                            <CrudView locations={this.state.locations} update={this.updateLocations} />
                            : <div className="error-msg">Something went wrong. Please try agian later.</div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default MapCrud;
