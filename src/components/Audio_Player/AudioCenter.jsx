import React from "react";
import "./AudioCenter.css";
import AudioProgress from "./AudioProgress";
import AudioTimers from "./AudioTimers";
import AudioPlayerTitle from "./AudioPlayerTitle";

class AudioCenter extends React.Component {
	render() {
		return (
			<div className='audio-center'>
				<AudioPlayerTitle
					title={this.props.title}
					composer={this.props.composer}
				/>
				<div className='audio-player-ghost'></div>

				<AudioProgress
					pureTime={this.props.pureTime}
					pureDuration={this.props.pureDuration}
					onClick={this.changeLocation}
					updateCurrentTime={this.props.updateCurrentTime}
				/>
				<AudioTimers
					currentTime={this.props.currentTime}
					timeRemaining={this.props.timeRemaining}
				/>
			</div>
		);
	}
}
export default AudioCenter;
