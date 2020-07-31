import React from "react";
import "./AudioCenter.css";

class AudioTimers extends React.Component {
	render() {
		return (
			<div className='audio-timers-row'>
				<div className='audio-current-position'>
					<p>{this.props.currentTime}</p>
				</div>
				<div className='audio-time-remaining'>
					<p className='time-remaining-text'>{this.props.timeRemaining}</p>
				</div>
			</div>
		);
	}
}
export default AudioTimers;

// Get time (this.audio.currentTime) update state with it, and then add that as prop to render spots here. Might just need to add as props and not update state.
