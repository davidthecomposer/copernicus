import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import "./AudioPlayList.scss";

const AudioPlayList = ({
	displayPlanetInfo,
	musicData,
	sendDataToViewer,
	currentTime,
	currentTrack,
	timeRemaining,
	slideInOrOut,
	playlistSlideState,
	slideIconState,
	infoButtonOpacity,
}) => {
	const [autoPlaySwitch, setAutoPlaySwitch] = useState("");
	const [playButtonList, setPlayButtonList] = useState([]);

	const populatePlayButtonList = async (playButton) => {
		await setPlayButtonList((playButtonList) => [
			...playButtonList,
			playButton,
		]);
	};

	const autopPlayOnOff = () => {
		if (autoPlaySwitch === "") {
			setAutoPlaySwitch("on");
		} else {
			setAutoPlaySwitch("");
		}
	};

	const autoPlayTrackList = (playButton) => {
		if (autoPlaySwitch === "on") {
			const lastButtonIndex = playButtonList.indexOf(playButton);
			const nextButton = playButtonList[lastButtonIndex + 1];
			if (lastButtonIndex === playButtonList.length - 1) {
				playButtonList[0].click();
			} else {
				nextButton.click();
			}
		}
	};
	const stopPlayingTracks = (playButton) => {
		const currentlyPlaying = playButtonList.filter((button) => {
			return button.src.match("pause_button");
		});
		if (currentlyPlaying.length > 0) {
			currentlyPlaying[0].click();
		}
	};

	const players = musicData.map((player) => {
		return (
			<AudioPlayer
				title={player.title}
				key={player._id}
				audioFile={player.audioName}
				composer={player.composer}
				displayPlanetInfo={displayPlanetInfo}
				sendDataToViewer={sendDataToViewer}
				autoPlayTrackList={autoPlayTrackList}
				populatePlayButtonList={populatePlayButtonList}
				infoButtonOpacity={infoButtonOpacity}
				stopPlayingTracks={stopPlayingTracks}
			/>
		);
	});
	return (
		<div className={`playlist-container ${playlistSlideState}`}>
			<div className='playlist-interface'>
				<div className='player-display'>
					<p className='current-time'>{currentTime}</p>
					<p className='title'>{currentTrack}</p>
					<p className='time-remaining'>{timeRemaining}</p>
				</div>
				{players}
				<div className='bottom-display'>
					<p>auto-play:</p>
					<div
						className={`autoplay-container ${autoPlaySwitch}`}
						onClick={autopPlayOnOff}></div>
				</div>
			</div>
			<div className={`playlist-tab`} onClick={slideInOrOut}>
				<div className={slideIconState}></div>
			</div>
		</div>
	);
};

export default AudioPlayList;
