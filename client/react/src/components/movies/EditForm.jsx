import { NavLink } from "react-router-dom";
import Input from "../common/Input";
import CheckBox from "../common/Checkbox";
import { allGenres } from "./utils";

const EditForm = ({
	movieData,
	handleInput,
	handleCheck,
	sendData,
	errors,
}) => {
	const { name, genres, premiered, image } = movieData;

	const checkboxRe = allGenres.map((gen) => {
		let checked = genres.includes(gen) ? true : false;
		return (
			<CheckBox
				key={gen}
				name={gen}
				label={gen}
				id={gen}
				checked={checked}
				onChange={handleCheck}
			/>
		);
	});

	return (
		<div style={{ textAlign: "left" }}>
			<form
				onSubmit={sendData}
				style={{
					width: 400,
					maxWidth: "100%",
					margin: "0 auto",
					padding: 20,
					backgroundColor: "white",
					border: "1px solid #094CB0",
					borderRadius: 5,
				}}>
				<h3>Edit Movie</h3>
				<h2>{name}</h2>
				<Input
					name="name"
					label="Name "
					value={name}
					onChange={handleInput}
					autoFocus={true}
					error={errors.name ? "Movie name is required." : null}
				/>
				<Input
					name="image"
					label="Image URL "
					value={image}
					onChange={handleInput}
				/>
				<Input
					type="date"
					name="premiered"
					label="Premiered "
					value={premiered.split("T")[0]}
					onChange={handleInput}
					error={errors.premiered ? "Premiered date is required" : null}
				/>
				<br />
				<p>Genres: </p>
				{errors.genres ? (
					<div className="alert alert-danger" style={{width: "fit-content"}}>
						At least one Genre is required.
					</div>
				) : null}
				<div
					style={{
						width: "100%",
						height: 200,
						overflowY: "scroll",
					}}>
					{checkboxRe}
				</div>
				<br />
				<div
					className="btn-group"
					style={{ width: "100%", }}>
					<button className="btn btn-primary" type="submit">
						Update
					</button>
					<NavLink className="btn btn-outline-danger" to="/movies/all">
						Cancel
					</NavLink>
				</div>
				<br />
			</form>
		</div>
	);
};

export default EditForm;
