import React, { useEffect, useState } from "react";

import "./Comment-Display.scss";

const CommentDisplay = ({ musicData, currentTrack, currentTime, pureTime }) => {
	const [activeTrackComments, setActiveTrackComments] = useState([]);
	const [visibleComments, setVisibleComments] = useState([]);
	const commentObject = musicData.map((track) => [track.title, track.comments]);

	useEffect(() => {
		const filteredTrack = commentObject.filter(
			(track) => track[0] === currentTrack
		);

		const currentComments = filteredTrack.map((eachComment) => {
			if (filteredTrack.length > 0) {
				return eachComment[1];
			} else {
				return {
					name: "",
					comment: "",
					timestamp: 1000000,
				};
			}
		});

		setActiveTrackComments(currentComments);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTrack]);

	useEffect(() => {
		if (activeTrackComments[0] !== undefined) {
			const listedComments = activeTrackComments[0]
				.filter((comment) => {
					const animationStartTime =
						Number(pureTime) - Number(comment.timestamp);
					return comment.timestamp <= pureTime && animationStartTime < 20;
				})
				.map((comment) => {
					return (
						<div
							key={comment._id}
							className={
								"single-comment"
							}>{` "${comment.comment}"   -${comment.name}`}</div>
					);
				});

			setVisibleComments(listedComments);
		}
	}, [activeTrackComments, pureTime]);

	return <div className='comment-display'>{visibleComments}</div>;
};

export default CommentDisplay;
