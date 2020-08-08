import React from "react";

const AudioPlayerTitle = ({ title, opacity }) => {
	return <p className={`audio-player-title ${opacity}`}>{title}</p>;
};
export default AudioPlayerTitle;
