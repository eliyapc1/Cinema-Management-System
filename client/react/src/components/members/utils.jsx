import axios from "axios";
import Joi from 'joi-browser';

const fetchMemberMovies = async (memberId, setState) => {
  const subsAPI = "http://localhost:8001/api/subscriptions";
  const moviesAPI = "http://localhost:8001/api/movies";
  const moviesAPIarr = [];

  try {
    const {
      data: { movies },
    } = await axios.get(`${subsAPI}/${memberId}`);
    
    for (const movie of movies) {
      const {
        data: { name },
      } = await axios.get(`${moviesAPI}/${movie.movieId}`);
      const date = movie.date.split("T")[0];
      moviesAPIarr.push({ name, date });
    }
    return setState(moviesAPIarr);
  } catch (err) {
    // console.log(err.message);
  }
};

const fetchSelectMovies = async (memberId, setSelectMovies) => {
  const subsAPI = "http://localhost:8001/api/subscriptions";
  const moviesAPI = "http://localhost:8001/api/movies";
  let memberMovies = [];
  try {
    const {
      data: { movies },
    } = await axios.get(`${subsAPI}/${memberId}`);
    for (const movie of movies) {
      const {
        data: { name },
      } = await axios.get(`${moviesAPI}/${movie.movieId}`);
      memberMovies.push({ name, date: movie.date.split("T")[0] });
    }
  } catch (err) {
    console.log(err);
  }
  let { data: allMovies } = await axios.get(moviesAPI);
  allMovies = allMovies.map((movie) => {
    return { movieId: movie._id, name: movie.name };
  });
  memberMovies = memberMovies.map((movie) => movie.name);
  allMovies = allMovies.filter((movie) => !memberMovies.includes(movie.name));
  setSelectMovies(allMovies);
};

const memberSchema = {
  name: Joi.string().required().label("Name"),
  email: Joi.string().required().label("Email"),
  city: Joi.string().required().label("City"),
}

const subMovieSchema = {
  movieId: Joi.string().required().label("Name"),
  date: Joi.date().required().label("Date")
}

export { fetchMemberMovies, fetchSelectMovies, memberSchema, subMovieSchema };
