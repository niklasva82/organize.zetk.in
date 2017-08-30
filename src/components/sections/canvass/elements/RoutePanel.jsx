import React from 'react';

import Button from '../../../misc/Button';
import LoadingIndicator from '../../../misc/LoadingIndicator';
import RouteList from './RouteList';


export default class RoutePanel extends React.Component {
    render() {
        let draftList = this.props.draftList;
        let content;

        if (draftList && draftList.isLoading) {
            content = <LoadingIndicator />;
        }
        else if (draftList && draftList.items && draftList.items.length) {
            content = (
                <div className="RoutePanel-drafts">
                    <RouteList list={ draftList }
                        onRouteMouseOver={ this.onRouteMouseOver.bind(this) }
                        onRouteMouseOut={ this.onRouteMouseOut.bind(this) }
                        />
                </div>
            );
        }
        else {
            content = (
                <div className="RoutePanel-config">
                    <Button
                        className="AllRoutesPane-generateButton"
                        labelMsg="panes.allRoutes.routes.generateButton"
                        onClick={ this.onGenerateButtonClick.bind(this) }
                        />
                </div>
            );
        }

        return (
            <div className="RoutePanel">
                { content }
            </div>
        );
    }

    onGenerateButtonClick() {
        if (this.props.onGenerate) {
            let addresses = this.props.addressList.items.map(i => i.data.id);
            let config = {
                routeSize: 30,
            };

            this.props.onGenerate(addresses, config);
        }
    }

    onRouteMouseOver(route) {
        if (this.props.onRouteMouseOver) {
            this.props.onRouteMouseOver(route);
        }
    }

    onRouteMouseOut(route) {
        if (this.props.onRouteMouseOut) {
            this.props.onRouteMouseOut(route);
        }
    }
}