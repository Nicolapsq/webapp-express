const express = require("express");
const router = express.Router();

// importazione del db movies_db
// const movies = require("../data/movies_db");

// importazione delle funzioni all'interno del file moviesController.js
const moviesController = require("../controllers/moviesController");

// definisco tutte le rotte crud

// rotta per index (lista completa)
router.get("/", moviesController.index);

// rotta per show (lista completa)
router.get("/:id", moviesController.show);

module.exports = router;