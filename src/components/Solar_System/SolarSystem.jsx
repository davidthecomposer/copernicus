import React from "react";
import "./SolarSystem.scss";

const SolarSystem = ({ planetState }) => {
	return (
		<div className='solar-system'>
			<div className='sun'></div>
			<div className='gravity-mercury'>
				<div className='mercury'></div>
				<div className={`mercury-info ${planetState.mercury}`}></div>
			</div>
			<div className='gravity-venus'>
				<div className='venus'></div>
				<div className={`venus-info ${planetState.venus}`}></div>
			</div>
			<div className='gravity-earth'>
				<div className='earth'></div>
				<div className={`earth-info ${planetState.earth}`}></div>
			</div>
			<div className='gravity-mars'>
				<div className='mars'></div>
				<div className={`mars-info ${planetState.mars}`}></div>
			</div>
			<div className='gravity-jupiter'>
				<div className='jupiter'></div>
				<div className={`jupiter-info  ${planetState.jupiter} `}></div>
			</div>
			<div className='gravity-saturn'>
				<div className='saturn'></div>
				<div className={`saturn-info ${planetState.saturn}`}></div>
			</div>
			<div className='gravity-uranus'>
				<div className='uranus'></div>
				<div className={`uranus-info ${planetState.uranus}`}></div>
			</div>
			<div className='gravity-neptune'>
				<div className='neptune'></div>
				<div className={`neptune-info ${planetState.neptune}`}></div>
			</div>
			<div className='gravity-pluto'>
				<div className='pluto'></div>
				<div className={`pluto-info ${planetState.pluto}`}></div>
			</div>
		</div>
	);
};

export default SolarSystem;
