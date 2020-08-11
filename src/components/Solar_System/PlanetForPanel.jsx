import React from "react";
import "./PlanetForPanel.scss";

const PlanetForPanel = ({ planetState }) => {
	return (
		<div className='planet-collection'>
			<div className={`mercury-info ${planetState.mercury}`}></div>
			<div className={`venus-info ${planetState.venus}`}></div>
			<div className={`earth-info ${planetState.earth}`}></div>
			<div className={`mars-info ${planetState.mars}`}></div>
			<div className={`jupiter-info  ${planetState.jupiter} `}></div>
			<div className={`saturn-info ${planetState.saturn}`}></div>
			<div className={`uranus-info ${planetState.uranus}`}></div>
			<div className={`neptune-info ${planetState.neptune}`}></div>
			<div className={`pluto-info ${planetState.pluto}`}></div>
		</div>
	);
};

export default PlanetForPanel;
