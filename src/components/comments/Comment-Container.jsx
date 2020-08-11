import React, { useState, useReducer } from "react";
import "./Comment-Container.scss";

const CommentContainer = ({
	musicData,
	currentTime,
	currentTrack,
	pureTime,
}) => {
	const [formVisibility, setFormVisibility] = useState("");
	const [formOpenClose, setFormOpenClose] = useState("");
	const [formData, setFormData] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			track: "current track",
			time: "current time",
			name: "",
			message: "",
		}
	);
	const options = musicData.map((track) => {
		return (
			<option className='track-option' value={track.title} key={track._id}>
				{track.title}
			</option>
		);
	});

	const showCommentForm = () => {
		if (formOpenClose !== "close-form-icon") {
			setFormOpenClose("close-form-icon");
			setFormVisibility("visible-form");
		} else {
			setFormOpenClose("switch-to-icon");
			setFormVisibility("");
		}
	};

	const updateFormState = (e) => {
		const name = e.target.name;
		const newValue = e.target.value;

		setFormData({ [name]: newValue });
	};

	const handleCurrentTrack = async () => {
		if (formData.track === "track") {
			await setFormData({ track: currentTrack });
		}
		if (formData.time === "time") {
			await setFormData({ time: currentTime });
		}
	};

	const submitComment = async (e) => {
		try {
			await e.preventDefault();
			await handleCurrentTrack();
			const track_id = musicData.find((track) => track.title === currentTrack)
				._id;

			const body = JSON.stringify({
				track_id: track_id,
				name: formData.name,
				timestamp: pureTime,
				comment: formData.message,
			});

			const response = await fetch(
				`https://copernicus-api.herokuapp.com/tracks/${currentTrack}/comments`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: body,
				}
			);

			const userResponse = await response.json();
			const clearData = {
				track: "track",
				time: "time",
				name: "",
				message: `${userResponse}`,
			};
			setFormData(clearData);

			setTimeout(() => setFormData({ message: "" }), 3000);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='comment-container'>
			<div
				className={`comment-icon ${formOpenClose}`}
				onClick={showCommentForm}
			/>
			<form
				className={`track-comment-form ${formVisibility}`}
				onSubmit={submitComment}>
				<div className='first-column'>
					<select
						onChange={updateFormState}
						value={formData.track}
						name='track'>
						<option className='track-option' placeholder='current track'>
							current
						</option>
						{options}
					</select>
					<input
						onChange={updateFormState}
						className='track-time'
						type='text'
						placeholder='time'
						value={formData.time}
						name='time'
					/>
					<input
						onChange={updateFormState}
						className='name'
						type='text'
						placeholder='name'
						value={formData.name}
						name='name'
					/>
				</div>

				<textarea
					type='text'
					placeholder='make a comment about one of the tracks here'
					value={formData.message}
					onChange={updateFormState}
					name='message'
				/>

				<input type='submit' className='submit' value='Submit' />
			</form>
		</div>
	);
};

export default CommentContainer;

// media querries
//
// Sass refactoring
