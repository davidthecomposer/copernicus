import React from "react";
import "./AudioPlayer.scss";

import PlayButton from "./PlayButton";
import infoButton from "../../images/info_button.svg";
import AudioProgress from "./AudioProgress";
import AudioPlayerTitle from "./AudioPlayerTitle";
import playButtonImage from "../../images/play_button.svg";
import pauseButtonImage from "../../images/pause_button.svg";

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: "0:00",
			pureTime: 0,
			pureDuration: 0,
			buttonImage: playButtonImage,
			infoBtnOpacity: "",
			titleOpacity: "",
			volume: 1,
			timeRemaining: "0:00",
			playButton: null,
		};
		this.audio = React.createRef();
	}

	playState = (e) => {
		if (this.audio.current.ended) {
			this.audio.current.load();
			this.props.autoPlayTrackList(this.state.playButton);
			this.setState({
				buttonImage: playButtonImage,
			});
			this.setState({ titleOpacity: "" });
		} else if (this.audio.current.currentTime === 0) {
			this.setState({ buttonImage: pauseButtonImage });
			this.setState({ titleOpacity: "teal" });
			this.audio.current.play();
		} else if (this.state.buttonImage === pauseButtonImage) {
			this.setState({ buttonImage: playButtonImage });

			this.setState({ titleOpacity: "" });
			this.audio.current.pause();
		} else if (this.state.buttonImage === playButtonImage) {
			this.setState({ buttonImage: pauseButtonImage });
			this.setState({ titleOpacity: "teal" });
			this.audio.current.play();
		}
	};

	setPlayButtonRefState = (buttonRef) => {
		this.setState({ playButton: buttonRef });
	};

	getTimeCalc = (event) => {
		const audio = this.audio.current;
		const currentTime =
			Math.floor(audio.currentTime.toFixed(0) / 60) +
			":" +
			(audio.currentTime.toFixed(0) < 10
				? `0${audio.currentTime.toFixed(0)}`
				: audio.currentTime.toFixed(0) % 60 < 10
				? `0${audio.currentTime.toFixed(0) % 60}`
				: audio.currentTime.toFixed(0) % 60
				? audio.currentTime.toFixed(0) % 60
				: "00");
		this.setState({ currentTime: currentTime });
		this.getDuration();
	};

	getDuration = (event) => {
		const time =
			Math.floor(this.audio.current.duration.toFixed(0)) -
			Math.floor(this.audio.current.currentTime.toFixed(0));

		const timeRemaining =
			Math.floor(time / 60) +
			":" +
			(time < 10
				? `0${time}`
				: time % 60 < 10
				? `0${time % 60}`
				: time % 60
				? time % 60
				: "00");

		this.setState({ timeRemaining: timeRemaining });
		this.pureTimeAndDuration();
	};

	pureTimeAndDuration = () => {
		this.setState({
			pureTime: this.audio.current.currentTime,
			pureDuration: this.audio.current.duration,
		});
		const track = this.audio.current;
		const played = track.played;
		// const currentTime = track.currentTime;
		// const pureDuration = track.duration;
		const title = track.dataset.title;

		this.props.sendDataToViewer(
			this.state.currentTime,
			this.state.timeRemaining,
			title,
			played
		);
	};

	updateCurrentTime = (newTime) => {
		this.audio.current.currentTime = newTime;
	};

	changeInfoBtnOpacity = () => {
		this.state.infoBtnOpacity === ""
			? this.setState({ infoBtnOpacity: "full-opacity" })
			: this.setState({ infoBtnOpacity: "" });
	};

	render() {
		return (
			<div className={`audio-player`}>
				<audio
					className={`audio-file `}
					src={this.props.audioFile}
					ref={this.audio}
					onTimeUpdate={this.getTimeCalc}
					onDurationChange={this.getDuration}
					onEnded={this.playState}
					onLoad={this.playState}
					data-title={this.props.title}
				/>
				<PlayButton
					playState={this.playState}
					image={this.state.buttonImage}
					populatePlayButtonList={this.props.populatePlayButtonList}
					passRefToPlayer={this.setPlayButtonRefState}
				/>
				<AudioPlayerTitle
					title={this.props.title}
					opacity={this.state.titleOpacity}
				/>

				<AudioProgress
					pureTime={this.state.pureTime}
					pureDuration={this.state.pureDuration}
					onClick={this.changeLocation}
					updateCurrentTime={this.updateCurrentTime}
				/>

				<img
					className={`info-button ${this.state.infoBtnOpacity}`}
					src={infoButton}
					alt='info'
					onClick={this.props.displayPlanetInfo}
					onMouseUp={this.changeInfoBtnOpacity}
					data-title={this.props.title}
				/>
			</div>
		);
	}
}

export default AudioPlayer;
