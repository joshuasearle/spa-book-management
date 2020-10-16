const express = require("express");

const actors = require("../controllers/actor");
const movies = require("../controllers/movie");

const router = express.Router();

// Actor routes
router.get("/actors", actors.getAll);
router.post("/actors", actors.createOne);
router.get("/actors/:id", actors.getOne);
router.put("/actors/:id", actors.updateOne);
router.delete("/actors/:id", actors.deleteOne);
router.post("/actors/:id/movies", actors.addMovie);
router.delete("/actors/:actorId/:movieId", actors.removeMovieFromActor);
router.get("/actors/movies/:rating", actors.actorsWithRating);

// Movies routes
router.get("/movies", movies.getAll);
router.post("/movies", movies.createOne);
router.get("/movies/:id", movies.getOne);
router.put("/movies/:id", movies.updateOne);
router.delete("/movies/:id", movies.deleteOne);
router.delete("/movies/:movieId/:actorId", movies.removeActorFromMovie);
// My implementation is idempotent
router.put("/movies/:movieId/:actorId", movies.addActor);
router.delete("/movies", movies.deleteMovieRange);

// 404 route
router.use("/", (req, res) => res.status(404).json());

module.exports = router;
