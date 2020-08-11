import React, { useState, useEffect, useRef } from "react";
import "./PlayButton..scss";

const PlayButton = ({
	playState,
	image,
	populatePlayButtonList,
	passRefToPlayer,
}) => {
	const [playBtnPress, setPlayBtnPress] = useState("");
	const [playButtonRef, setPlayButtonRef] = useState(null);
	const playButton = useRef();

	useEffect(() => {
		const runAsync = async () => {
			await setPlayButtonRef(playButton.current);
			if (playButtonRef !== null) {
				populatePlayButtonList(playButtonRef);
				passRefToPlayer(playButtonRef);
			}
		};
		runAsync();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playButtonRef]);

	const runOnClick = () => {
		playState();
		playBtnPress === "" || playBtnPress === "press-again"
			? setPlayBtnPress("press")
			: setPlayBtnPress("press-again");
	};

	return (
		<img
			src={image}
			alt='play and pause button'
			className={`play-button ${playBtnPress}`}
			ref={playButton}
			onClick={() => {
				runOnClick();
			}}
		/>
	);
};

export default PlayButton;
