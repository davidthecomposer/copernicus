import React from "react";
import "./AlbumCover.css";

const AlbumCover = (props) => {
	return (
		<img
			src={props.imageSrc}
			className='audio-album-cover'
			alt={props.imageSrc}
		/>
	);
};
export default AlbumCover;
