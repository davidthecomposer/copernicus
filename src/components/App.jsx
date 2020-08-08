import React, { useState, useEffect } from "react";
import "./App.scss";

import SolarSystem from "./Solar_System/SolarSystem";
import AudioPlayList from "./Audio_Player/AudioPlayList";
import InfoCardList from "../components/Info_Cards/InfoCardList";
import CommentContainer from "../components/comments/Comment-Container";
import CommentDisplay from "../components/comments/Comment-Display";
import Earth from "../audio/Earth.wav";
import Jupiter from "../audio/Jupiter.wav";
import Mars from "../audio/Mars.wav";
import Mercury from "../audio/Mercury.wav";
import Neptune from "../audio/Neptune.wav";
import Pluto from "../audio/Pluto.wav";
import Saturn from "../audio/Saturn.wav";
import Uranus from "../audio/Uranus.wav";
import Venus from "../audio/Venus.mp3";

const App = () => {
	const [planetState, setPlanetState] = useState({
		mercury: "",
		venus: "",
		earth: "",
		mars: "",
		jupiter: "",
		saturn: "",
		uranus: "",
		neptune: "",
		pluto: "",
	});
	const [musicData, setMusicData] = useState([]);
	const [trackList, setTrackList] = useState([
		Jupiter,
		Neptune,
		Mars,
		Uranus,
		Mercury,
		Pluto,
		Saturn,
		Venus,
		Earth,
	]);
	const [slideOutState, setSlideOutState] = useState("");
	const [titlePosition, setTitlePosition] = useState("");
	const [currentTime, setCurrentTime] = useState("-:--");
	const [timeRemaining, setTimeRemaining] = useState("-:--");
	const [currentTrack, setCurrentTrack] = useState("-");
	const [playlistSlideState, setPlaylistSlideState] = useState(
		window.innerWidth < 501 ? "slide-out-playlist" : "slide-in-playlist"
	);
	const [slideIconState, setSlideIconState] = useState(
		window.innerWidth < 501 ? "slide-in-icon" : "slideout-icon"
	);

	useEffect(() => {
		const getInitialData = async () => {
			const response = await fetch(
				"https://copernicus-api.herokuapp.com/tracks",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const musicData = await response.json();
			musicData.sort((a, b) => {
				return a.playListOrder - b.playListOrder;
			});
			musicData.forEach(
				(track) => (track.audioName = trackList[musicData.indexOf(track)])
			);

			await setMusicData(musicData);
		};

		getInitialData();
	}, [trackList]);

	const displayPlanetInfo = (e) => {
		const targetPlanet = e.target.dataset.title.toLowerCase();

		if (planetState[targetPlanet] !== "planet-grow") {
			setPlanetState((planetState) => ({
				...planetState,
				[targetPlanet]: "planet-grow",
			}));
			setSlideOutState("slide-out");
			setTitlePosition("left");
			if (window.innerWidth < 501) {
				setPlaylistSlideState("slide-out-playlist");
				setSlideIconState("slide-in-icon");
			}
		} else {
			setPlanetState((planetState) => ({
				...planetState,
				[targetPlanet]: "planet-shrink",
			}));
			setSlideOutState("");
			setTitlePosition("");
		}
	};

	const sendDataToViewer = (currentTime, timeRemaining, title, played) => {
		if (played.length !== 0) {
			setCurrentTime(currentTime);
			setTimeRemaining(timeRemaining);
			setCurrentTrack(title);
		}
	};

	const slideInOrOut = () => {
		playlistSlideState === "" || playlistSlideState === "slide-in-playlist"
			? setPlaylistSlideState("slide-out-playlist")
			: setPlaylistSlideState("slide-in-playlist");
		slideIconState === "slideout-icon"
			? setSlideIconState("slide-in-icon")
			: setSlideIconState("slideout-icon");
	};

	return (
		<div className='app'>
			<h1 className={`main-title ${titlePosition}`}>Copernicus Etudes</h1>
			<SolarSystem planetState={planetState} />
			<AudioPlayList
				displayPlanetInfo={displayPlanetInfo}
				musicData={musicData}
				sendDataToViewer={sendDataToViewer}
				currentTime={currentTime}
				timeRemaining={timeRemaining}
				currentTrack={currentTrack}
				slideInOrOut={slideInOrOut}
				playlistSlideState={playlistSlideState}
				slideIconState={slideIconState}
			/>
			<InfoCardList
				musicData={musicData}
				planetState={planetState}
				slideOutState={slideOutState}
			/>
			<CommentContainer
				musicData={musicData}
				currentTrack={currentTrack}
				currentTime={currentTime}
			/>
			<CommentDisplay />
		</div>
	);
};

export default App;

//
// Hook up API to comments and create logic for presenting them make sure data is named correctly for both ends
// comments and player in and out for mobile. Also Logic.
// make all the adjustments for media queries etc.
