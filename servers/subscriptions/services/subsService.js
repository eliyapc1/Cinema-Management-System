const Sub = require("../models/subsModel");

const getAllSubs = () => {
  return new Promise((resolve, reject) => {
    Sub.find({}, (err, allSubs) => {
      if (err) reject(err);
      else resolve(allSubs);
    });
  });
};

const getSubById = (id) => {
  return new Promise((resolve, reject) => {
    Sub.findOne({ memberId: id }, (err, sub) => {
      if (err) reject(err);
      else resolve(sub);
    });
  });
};

const addSub = (sub) => {
  return new Promise((resolve, reject) => {
    const newSub = new Sub(sub);
    newSub.save((err) => {
      if (err) reject(err);
      else resolve("Subscription has been added.");
    });
  });
};

const updateSub = (id, updatedSub) => {
  return new Promise((resolve, reject) => {
    Sub.findOneAndUpdate({ id }, updatedSub, (err) => {
      if (err) reject(err);
      else resolve("Subscription has been updated.");
    });
  });
};

const deleteSub = (id) => {
  return new Promise((resolve, reject) => {
    Sub.findOneAndDelete({ id }, (err) => {
      if (err) reject(err);
      else resolve("Subscription has been deleted.");
    });
  });
};

const getAllSubsByMovie = (movieId) => {
  return new Promise((resolve, reject) => {
    Sub.find({ movies: { $elemMatch: { movieId } } }, (err, subs) => {
      if (err) reject(err);
      resolve(subs);
    });
  });
};

const addSubMovie = (memberId, movie) => {
  const { movieId, date } = movie;
  return new Promise((resolve, reject) => {
    Sub.findOne({ memberId }, (err, sub) => {
      if (err) reject(err);
      const check = sub.movies.filter((movie) => movie.movieId == movieId);
      if (!check.length) {
        sub.movies.push({ movieId, date });
        sub.save((err) => {
          if (err) reject(err);
          resolve("Movie has been subscribed.");
        });
      } else resolve("Movie has already been subscribed.");
    });
  });
};

const deleteSubMovie = (memberId, movieId) => {
  return new Promise((resolve, reject) => {
    Sub.findOne({ memberId }, (err, sub) => {
      if (err) reject(err);
      sub.movies = sub.movies.filter((movie) => movie.movieId != movieId);
      sub.save((err) => {
        if (err) reject(err);
        resolve("Movie has been unsubscribed.");
      });
    });
  });
};

const deleteMovieFromAllSubs = (movieId) => {
  return new Promise((resolve, reject) => {
    Sub.find({ movieId }, (err, subs) => {
      if (err) reject(err);
      for (let i = 0; i < subs.length; i++) {
        subs[i].movies = subs[i].movies.filter(
          (movie) => movie.movieId != movieId
        );
        subs[i].save((err) => {
          if (err) reject(err);
        });
      }
      resolve("Movie has been deleted from all subscriptions.");
    });
  });
};

module.exports = {
  getAllSubs,
  getSubById,
  addSub,
  updateSub,
  deleteSub,
  addSubMovie,
  deleteSubMovie,
  deleteMovieFromAllSubs,
  getAllSubsByMovie,
};
