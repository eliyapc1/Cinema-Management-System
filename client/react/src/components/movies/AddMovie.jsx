import React, { useState } from "react";
import AddForm from "./AddForm";
import { handleInput, handleCheck, sendData, joiValid } from "../common/utils";
import { movieSchema } from "./utils";

const AddMovie = () => {
	const [movie, setMovie] = useState({
		name: "",
		genres: [],
		premiered: "",
		image: "",
	});
	const [errors, setErrors] = useState({
		name: "",
		genres: "",
		premiered: "",
	});
	const [sent, setSent] = useState(false);

	const { name, premiered, genres } = movie;
	return (
		<div style={{ textAlign: "left" }}>
			{sent && (
				<div
					className="alert alert-success"
					style={{
						textAlign: "center",
						margin: "0 auto",
						width: 400,
						maxWidth: "100%",
						marginBottom: 20,
					}}>
					Movie has been successfully added.
				</div>
      )}
      
			<AddForm
				handleInput={(e) => {
					handleInput(e, movie, setMovie);
					setErrors({ ...errors, name: "", premiered: "" });
				}}
				handleCheck={(e) => {
					handleCheck(e, movie, setMovie);
					setErrors({ ...errors, genres: "" });
				}}
				sendData={(e) => {
					e.preventDefault();
					const joiErrors = joiValid({ name, premiered, genres }, movieSchema);
					if (joiErrors) return setErrors(joiErrors);
					sendData(e, "movies", "post", movie, setSent);
				}}
				errors={errors}
			/>
			<br />
		</div>
	);
};

export default AddMovie;
