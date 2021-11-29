import { NavLink } from "react-router-dom";
import Input from "../common/Input";
import CheckBox from "../common/Checkbox";
import { allGenres } from "./utils";

const AddForm = ({ handleInput, handleCheck, sendData, errors }) => {
	const checkboxRe = allGenres.map((gen) => {
		return (
			<CheckBox
				key={gen}
				name={gen}
				label={gen}
				id={gen}
				onChange={handleCheck}
			/>
		);
	});

	return (
		<div className="add-movie">
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
				<h2>Add Movie</h2>
				<Input
					name="name"
					label="Name: "
					onChange={handleInput}
					autoFocus={true}
					error={errors.name ? "Movie name is required." : null}
				/>
				<Input name="image" label="Image URL: " onChange={handleInput} />
				<Input
					type="date"
					name="premiered"
					label="Premiered: "
					onChange={handleInput}
					error={errors.premiered ? "Premiered date is required" : null}
				/>
				<br />
				<p>Genres: </p>
				{errors.genres ? (
					<div className="alert alert-danger" style={{ width: "fit-content" }}>
						At least one Genre is required.
					</div>
				) : null}
				<div
					style={{
						width: "100%",
						height: 200,
						overflowY: "scroll",
					}}>
					<ul className="list-group">{checkboxRe}</ul>
				</div>
				<br />

				<div className="btn-group" style={{ width: "100%" }}>
					<button className="btn btn-primary" type="submit">
						Add
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

export default AddForm;
