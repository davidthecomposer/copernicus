import React from "react";
import "./PlayButton..css";

class PlayButton extends React.Component {
	render() {
		return (
			<img
				src={this.props.image}
				alt='play and pause button'
				className='play-button'
				onClick={this.props.playState}
			/>
		);
	}
}

export default PlayButton;
