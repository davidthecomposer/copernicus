import React from "react";
import "./InfoCard.scss";

const InfoCard = ({
	artistDescription,
	character,
	composer,
	difficulty,
	instruments,
	length,
	rhythm,
	title,
	year,
	visibilityState,
}) => {
	return (
		<div className={`info-card ${visibilityState}`}>
			<h1 className={"card-title"}>{title}</h1>
			<div className='planet-frame'></div>
			<div className='main-info'>
				<p className={"description"}>{artistDescription}</p>
			</div>

			<div className='stats'>
				<p>
					<span>Composer:</span> {composer}
				</p>
				<p>
					<span>Year:</span> {year}
				</p>
				<p>
					<span>Length:</span> {length}
				</p>
				<p>
					<span>Instruments:</span> Piano
				</p>
				<p>
					<span>Difficulty:</span> {difficulty}
				</p>
				<p>
					<span>Character: </span> {character}
				</p>
				<p>
					<span>Rhythm:</span> {rhythm}
				</p>
			</div>
		</div>
	);
};

export default InfoCard;
