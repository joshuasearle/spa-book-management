const mongoose = require("mongoose");
const { findOneAndUpdate } = require("../models/movie");

const Movie = require("../models/movie");

module.exports.getAll = async (req, res) => {
  const { startYear, endYear } = req.query;
  try {
    let moviePromise = Movie.find();
    if (startYear && endYear && startYear > endYear) {
      throw new Error("Start year must be less than end year");
    }
    if (startYear != undefined) {
      moviePromise = moviePromise.where("year").gte(startYear);
    }
    if (endYear != undefined) {
      moviePromise = moviePromise.where("year").lte(endYear);
    }
    const movies = await moviePromise.populate("actors");
    res.json(movies);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.createOne = async (req, res) => {
  const movieDetails = { ...req.body, _id: mongoose.Types.ObjectId() };
  const movie = new Movie(movieDetails);
  try {
    await movie.save();
    res.json(movie);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findOne({ _id: id }).populate("actor");
    res.json(movie);
  } catch (e) {
    res.json(e);
  }
};

module.exports.updateOne = async (req, res) => {
  const id = req.params.id;
  try {
    // Update movie with what is in the body of the request
    const movie = await Movie.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!movie) return res.status(404).json();
    res.json(movie);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findByIdAndRemove({ _id: id });
    if (!movie) res.status(404).json();
    res.json(movie);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.removeActorFromMovie = async (req, res) => {
  const { actorId, movieId } = req.params;
  try {
    // Probably a way to do this in one database call
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json();
    const result = await Movie.findOneAndUpdate(
      { _id: movieId },
      {
        $set: {
          actors: movie.actors.filter(
            (movieActorId) => String(movieActorId) != actorId
          ),
        },
      }
    );
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.addActor = async (req, res) => {
  const { actorId, movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    const actors = movie.actors;
    const actorInMovie = actors.includes(actorId);
    if (!actorInMovie) {
      await Movie.findOneAndUpdate(
        { _id: movieId },
        { $push: { actors: actorId } }
      );
    }
    if (!movie) return res.status(404).json();
    res.json(movie);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.deleteMovieRange = async (req, res) => {
  console.log("lsdjflk");
  const beforeYear = req.query.beforeYear;
  // const { startYear, endYear } = req.body;
  try {
    // if (startYear === undefined || endYear === undefined) {
    //   throw new Error("startYear and endYear are both required.");
    // }
    const result = await Movie.deleteMany({
      year: { $lte: beforeYear },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
};
