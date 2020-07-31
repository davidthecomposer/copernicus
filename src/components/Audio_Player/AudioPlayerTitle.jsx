import React from "react";
import "./AudioCenter.css";

const AudioPlayerTitle = (props) => {
	return (
		<p className='audio-player-title'>
			<strong className='audio-strong'>{props.title} </strong>
			<small className='audio-small'>|</small> {props.composer}
		</p>
	);
};
export default AudioPlayerTitle;
