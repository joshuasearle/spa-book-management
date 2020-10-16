const mongoose = require('mongoose');

const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports.getAll = async (req, res) => {
  try {
    const actors = await Actor.find().populate('movies');
    res.json(actors);
  } catch (e) {
    res.json(e);
  }
};

module.exports.createOne = async (req, res) => {
  const actorDetails = { ...req.body, _id: mongoose.Types.ObjectId() };
  const actor = new Actor(actorDetails);
  try {
    const result = await actor.save();
    res.json(result);
  } catch (e) {
    res.json(e);
  }
};

module.exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const actor = await Actor.findOne({ _id: id }).populate('movies');
    res.json(actor);
  } catch (e) {
    res.json(e);
  }
};

module.exports.updateOne = async (req, res) => {
  const id = req.params.id;
  try {
    // Update actor with what is in the body of the request
    const actor = await Actor.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!actor) return res.status(404).json();
    res.json(actor);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    const actor = await Actor.findOneAndRemove({ _id: id });
    if (!actor) res.status(404).json();

    // If deleteMovies option is selected, delete the movies
    // Equality of string, as query param will be string not bool
    if (req.query.deleteMovies === 'true') await deleteActorMovies(actor);

    res.json(actor);
  } catch (e) {
    res.status(400).json(e);
  }
};

const deleteActorMovies = async actor => {
  const movieIds = actor.movies;
  // Delete all movies in parallel
  const movieDeletions = movieIds.map(movieId => {
    return Movie.deleteOne({ _id: movieId });
  });
  await Promise.all(movieDeletions);
};

module.exports.removeMovieFromActor = async (req, res) => {
  const { actorId, movieId } = req.params;
  try {
    // TODO
    // Probably a way to do this in one database call
    const actor = await Actor.findById(actorId);
    if (!actor) return res.status(404).json();
    actor.movies = actor.movies.filter(actorMovieId => actorMovieId != movieId);
    const result = await actor.save();
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.addMovie = async (req, res) => {
  const actorId = req.params.id;
  const moiveId = req.body.id;
  try {
    const actor = await Actor.findOne({ _id: actorId });
    if (!actor) return res.status(404).json();
    const movie = await Movie.findOne({ _id: moiveId });
    if (!movie) return res.status(404).json();
    actor.movies.push(movie._id);
    await actor.save();
    res.json(actor);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports.actorsWithRating = async (req, res) => {
  const rating = req.params.rating;
  try {
    const actors = await Actor.find().populate('movies');
    // Filter out actors with no movies with rating greater than param rating
    // May be complex query to filter using the database
    const filteredActors = actors.filter(actor => {
      // Convert to bool
      return !!actor.movies.find(movie => movie.rating >= rating);
    });
    res.json(filteredActors);
  } catch (e) {
    res.status(400).json(e);
  }
};
