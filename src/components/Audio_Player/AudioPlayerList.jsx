import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";

const AudioPlayerList = (props) => {
	// Example of destructuring and extracting variables to use in map
	const players = MediaMusic.map((player) => {
		return (
			<AudioPlayer
				title={player.title}
				key={player.id}
				audioFile={player.audioName}
				imageSrc={player.imageSrc}
				secondClass={player.secondClass}
				composer={player.composer}
			/>
		);
	});
	return <div>{players}</div>;
};

export default AudioPlayerList;

// Should have logic for mapping out all audio players including date etc.
//Where is that data held? In Props?
