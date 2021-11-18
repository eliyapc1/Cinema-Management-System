import React, { useEffect, useState } from "react";
import { fetchSelectMovies, subMovieSchema } from "./utils";
import { sendData, joiValid } from "../common/utils";


const AddSubMovie = ({ memberId, renderParent }) => {
  let [selectMovies, setSelectMovies] = useState([]);
  const [submitMovie, setSubmitMovie] = useState({ movieId: "", date: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => fetchSelectMovies(memberId, setSelectMovies), []); //eslint-disable-line

  const optionRe = selectMovies.map((movie, i) => {
    return (
      <option key={i} value={movie.movieId}>
        {movie.name}
      </option>
    );
  });
  const handleChange = ({ target: { name, value } }) => {
    setErrors({})
    if (!name) name = "movieId";
    setSubmitMovie({ ...submitMovie, [name]: value });
  };
  const {movieId, date} = submitMovie;
  return (
    <div>
      {sent && <div
          className="alert alert-success"
          style={{
            textAlign: "center",
            margin: "0 auto",
            width: 350,
            marginBottom: 20,
          }}
        >
          Movie has been successfully subscribed.
        </div>}
      <form
        style={{ width: "50%", margin: "0 auto" }}
        // prettier-ignore
        onSubmit={(e) => {
          e.preventDefault();
          const joiErrors = joiValid({movieId, date}, subMovieSchema);
          if (joiErrors) return setErrors(joiErrors);
          sendData( e, "subscriptions", "put", submitMovie, setSent, memberId, renderParent )
      }}
      >
        <select
          className="form-select"
          defaultValue=""
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled>
            Select Movie...
          </option>
          {optionRe}
        </select>
        {errors.movieId ? <div className="alert alert-danger" >Select a movie name.</div>: null}
        <br />
        <input
          style={{
            width: "230px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
            borderRadius: 4,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "lightgray",
          }}
          name="date"
          type="date"
          onChange={(e) => handleChange(e)}
        />
        {errors.date ? <div className="alert alert-danger" >Date is required.</div>: null}
        <br />
        <br />
        <button className="btn btn-outline-primary" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default AddSubMovie;
