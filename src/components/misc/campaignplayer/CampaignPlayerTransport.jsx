import React from 'react';
import cx from 'classnames';

import Scrubber from './Scrubber';


export default class CampaignPlayerTransport extends React.Component {
    render() {
        const btnClass = cx({
            'CampaignPlayerTransport-button': true,
            'CampaignPlayerTransport-playButton': !this.props.playing,
            'CampaignPlayerTransport-stopButton': this.props.playing
        });

        const d = Date.create(this.props.time);
        const timeLabel = d.setUTC(true).format('{yyyy}-{MM}-{dd} {HH}:{mm}');

        return (
            <div className="CampaignPlayerTransport">
                <button className={ btnClass }
                    onClick={ this.onPlayStopClick.bind(this) }/>
                <span className="CampaignPlayerTransport-time">{ timeLabel }</span>
                <Scrubber time={ this.props.time }
                    startTime={ this.props.startTime }
                    endTime={ this.props.endTime }
                    onScrubBegin={ this.props.onScrubBegin }
                    onScrubEnd={ this.props.onScrubEnd }
                    onScrub={ this.props.onScrub }/>
            </div>
        );
    }

    onPlayStopClick(ev) {
        const playing = this.props.playing;

        if (playing && this.props.onStop) {
            this.props.onStop();
        }
        else if (!playing && this.props.onPlay) {
            this.props.onPlay();
        }
    }
}

CampaignPlayerTransport.propTypes = {
    time: React.PropTypes.number.isRequired,
    startTime: React.PropTypes.number.isRequired,
    endTime: React.PropTypes.number.isRequired,
    playing: React.PropTypes.bool,
    onPlay: React.PropTypes.func,
    onStop: React.PropTypes.func,
    onScrubBegin: React.PropTypes.func,
    onScrubEnd: React.PropTypes.func,
    onScrub: React.PropTypes.func
};
