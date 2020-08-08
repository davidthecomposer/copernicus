import React from "react";

class AudioProgress extends React.Component {
	constructor(props) {
		super(props);
		this.state = { progressBarValue: "0" };
		this.progressBar = React.createRef();
	}

	defaultValue = 0;
	componentDidMount = () => {
		this.progressTimer = setInterval(() => this.progressFollow(), 100);
	};

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	progressFollow = () => {
		const progressBarValue =
			(this.props.pureTime / this.props.pureDuration) * 100;

		this.setState({ progressBarValue: progressBarValue });
	};

	changeLocation = (event) => {
		let percent = event.nativeEvent.offsetX / event.target.offsetWidth;
		let newTime = this.props.pureDuration * percent;

		const progressBarValue = percent * 100;

		this.setState({
			progressBarValue: Number(progressBarValue),
		});
		this.props.updateCurrentTime(newTime);
		// this.audio.currentTime = this.audio.duration * percent;
	};

	render() {
		return (
			<div className='progress-container' onClick={this.changeLocation}>
				<progress
					className='audio-progress'
					type='number'
					max='100'
					value={this.state.progressBarValue || 0}
					ref={this.progressBar}></progress>
			</div>
		);
	}
}

export default AudioProgress;
