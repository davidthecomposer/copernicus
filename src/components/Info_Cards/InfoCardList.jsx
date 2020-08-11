import React from "react";
import InfoCard from "./InfoCard";

const InfoCardList = ({
	exitPlanetInfo,
	musicData,
	planetState,
	slideOutState,
}) => {
	const infoCards = musicData.map((player) => {
		const {
			artistDescription,
			character,
			composer,
			difficulty,
			instruments,
			length,
			rhythm,
			title,
			year,
			_id,
		} = player;

		const visibility =
			planetState[title.toLowerCase()] === "planet-grow" ? "visible" : "";

		return (
			<InfoCard
				key={`${_id}${visibility} `}
				artistDescription={artistDescription}
				character={character}
				composer={composer}
				difficulty={difficulty}
				instruments={instruments}
				length={length}
				rhythm={rhythm}
				title={title}
				year={year}
				visibilityState={visibility}
			/>
		);
	});
	return (
		<div className={`info-card-list ${slideOutState}`}>
			<div className='close-info-cards' onClick={exitPlanetInfo}></div>
			{infoCards}
		</div>
	);
};

export default InfoCardList;
