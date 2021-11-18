import React, { useState } from "react";
import EditForm from "./EditForm";
import { handleInput, handleCheck, sendData } from "../common/utils";
import { movieSchema } from "./utils";
import { joiValid } from "../common/utils";

const EditMovie = ({ location: { state: originalMovie } }) => {
  const { _id, name, genres, premiered, image } = originalMovie;
  const [movie, setMovie] = useState({ name, genres, premiered, image });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    genres: "",
    premiered: "",
  });
  return (
    <div style={{ textAlign: "left" }}>
      {sent && (
        <div
          className="alert alert-success"
          style={{
            textAlign: "center",
            margin: "0 auto",
            width: 300,
            marginBottom: 20,
          }}
        >
          Movie has been successfully updated.
        </div>
      )}
      <EditForm
        movieData={movie}
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
          const joiErrors = joiValid(
            {
              name: movie.name,
              genres: movie.genres,
              premiered: movie.premiered,
            },
            movieSchema
          );
          console.log(joiErrors);
          if (joiErrors) return setErrors(joiErrors);
          sendData(e, "movies", "put", movie, setSent, _id);
        }}
        errors={errors}
      />
    </div>
  );
};

export default EditMovie;
