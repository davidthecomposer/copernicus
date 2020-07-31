import React from "react";
import "./SolarSystem.scss";

const SolarSystem = () => {
	return (
		<div className='solar-system'>
			<div className='sun'></div>
			<div className='gravity-mercury'>
				<div className='mercury'></div>
			</div>
			<div className='gravity-venus'>
				<div className='venus'></div>
			</div>
			<div className='gravity-earth'>
				<div className='earth'></div>
			</div>
			<div className='gravity-mars'>
				<div className='mars'></div>
			</div>
			<div className='gravity-jupiter'>
				<div className='jupiter'></div>
			</div>
			<div className='gravity-saturn'>
				<div className='saturn'></div>
			</div>
			<div className='gravity-uranus'>
				<div className='uranus'></div>
			</div>
			<div className='gravity-neptune'>
				<div className='neptune'></div>
			</div>
			<div className='gravity-pluto'>
				<div className='pluto'></div>
			</div>
		</div>
	);
};

export default SolarSystem;
