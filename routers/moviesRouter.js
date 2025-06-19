const express = require("express");
const router = express.Router();
// const upload = require("../middlewares/multer");

// importazione del db movies_db
// const movies = require("../data/movies_db");

// importazione delle funzioni all'interno del file moviesController.js
const moviesController = require("../controllers/moviesController");

// definisco tutte le rotte crud

// rotta per index (lista completa)
router.get("/", moviesController.index);

// rotta per show (lista completa)
router.get("/:id", moviesController.show);


// rotta per creazione (post)
router.post("/:id", moviesController.store);
// rotta per aggiungere una immagine di un nuovo filn con multer
// router.post("/:id/",  upload.single("image"), moviesController.store);


module.exports = router;