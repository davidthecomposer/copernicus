import "./AudioVolume.css";
import React from "react";

const AudioVolume = (props) => {
	return (
		<div className='volume-container'>
			<input
				className={`audio-volumeBar ${props.volumeBarVisibilityState}`}
				type='range'
				min='0'
				max='1'
				step='0.01'
				value={props.volume}
				onChange={props.changeVolume}
				onMouseLeave={props.volumeBarVisibility}
				onMouseOver={props.volumeBarVisibility}
			/>
			<img
				className='audio-volume'
				src={props.volumeIcon}
				alt='Volume Icon'
				onClick={props.muteVolume}
				onMouseOver={props.volumeBarVisibility}
				onMouseLeave={props.volumeBarVisibility}
			/>
		</div>
	);
};
export default AudioVolume;
