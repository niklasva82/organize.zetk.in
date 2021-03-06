import React from 'react';
import { connect } from 'react-redux';

import RootPaneBase from '../RootPaneBase';
import Button from '../../misc/Button';
import LocationList from '../../lists/LocationList';
import { retrieveLocations } from '../../../actions/location';


@connect(state => state)
export default class LocationsPane extends RootPaneBase {
    componentDidMount() {
        super.componentDidMount();

        this.props.dispatch(retrieveLocations());
    }

    renderPaneContent() {
        let content = null;
        let locationList = this.props.locations.locationList;
        
        return (
            <div>
                <LocationList locationList={ locationList }
                    onItemClick={ this.onLocationClick.bind(this) }/>
            </div>
        );
    }

    getPaneTools(data) {
        return [
            <Button key="addButton"
                className="LocationsPane-addLocationButton"
                labelMsg="panes.locations.addButton"
                onClick={ this.onAddClick.bind(this) }/>
        ];
    }

    onAddClick() {
        this.openPane('addlocation');
    }

    onLocationClick(loc, ev) {
        if (ev && ev.altKey) {
            this.openPane('editlocation', loc.data.id);
        }
        else {
            this.openPane('location', loc.data.id);
        }
    }
}
