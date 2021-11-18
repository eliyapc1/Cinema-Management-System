import axios from "axios";
import Joi from 'joi-browser';

const allGenres = [
  "Action",
  "Adventure",
  "Anime",
  "Children",
  "Comedy",
  "Crime",
  "DIY",
  "Drama",
  "Espionage",
  "Family",
  "Fantasy",
  "Food",
  "History",
  "Horror",
  "Legal",
  "Medical",
  "Music",
  "Mystery",
  "Nature",
  "Romance",
  "Science-Fiction",
  "Sports",
  "Supernatural",
  "Thriller",
  "Travel",
  "War",
  "Western",
];

const fetchSubsWatched = async (_id, setSubsWatched) => {
  const host = "http://localhost:8001/api";
  const subsWatchedArr = [];
  const { data: subs } = await axios.get(
    `${host}/subscriptions/get-by-movie/${_id}`
  );

    for (const sub of subs) {
      const { memberId } = sub;
      const {
        data: { name },
      } = await axios.get(`${host}/members/${memberId}`);
      const date = sub.movies
        .find((movie) => movie.movieId === _id)
        .date.split("T")[0];
      subsWatchedArr.push({ memberId, name, date });
    }
  
  setSubsWatched(subsWatchedArr);
};

const movieSchema = {
  name: Joi.string().required().label("Name"),
  genres: Joi.array().items(Joi.string().required()).label("Genres"),
  premiered: Joi.date().required().label("Premiered Date"),
};

export { allGenres, fetchSubsWatched, movieSchema };
