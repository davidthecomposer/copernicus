import React, { useState, useReducer } from "react";
import "./Comment-Container.scss";

const CommentContainer = ({ musicData, currentTime, currentTrack }) => {
	const [formVisibility, setFormVisibility] = useState("");
	const [formOpenClose, setFormOpenClose] = useState("");
	const [formData, setFormData] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			track: "current",
			time: "current",
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
		if (formData.track === "current") {
			await setFormData({ track: currentTrack });
		}
		if (formData.time === "current") {
			await setFormData({ time: currentTime });
		}
	};

	const submitComment = async (e) => {
		try {
			await e.preventDefault();
			await handleCurrentTrack();
			const track_id = musicData.find((track) => track.title === currentTrack)
				._id;

			const body = {
				track_id: track_id,
				name: formData.name,
				timestamp: currentTime,
				comment: formData.message,
			};

			console.log(body);
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
			console.log(response.json());
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
						<option className='track-option' placeholder='current'>
							current
						</option>
						{options}
					</select>
					<input
						onChange={updateFormState}
						className='track-time'
						type='text'
						placeholder='current time'
						value={formData.time}
						name='time'
					/>
				</div>
				<input
					onChange={updateFormState}
					className='name'
					type='text'
					placeholder='name'
					value={formData.name}
					name='name'
				/>
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

//form API integration
// current track time element / playlist integration
//autoplay option
//mobile version - audioplaylist slideout/tab
// Sass refactoring
