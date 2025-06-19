// importazione del db
const connection = require("../data/movies_db");

// definisco la funzione index
function index(req, res) {
  // preparo la query
  const sql = `
    SELECT *
    FROM movies
    `;
  // eseguo la query
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    // console.log("risultato", results);
    res.json(results);
  });
}

// definisco la funzione show
function show(req, res) {
  const id = req.params.id;
  const sql = `
    SELECT movies.id AS movie_id,
    movies.title,
    movies.director,
    movies.genre,
    movies.release_year,
    movies.image,
    reviews.id AS review_id,
    reviews.name AS review_name,
    reviews.vote,
    reviews.text AS comment
    FROM movies
    INNER JOIN reviews
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    `;
  // eseguo la query inserendo il valore da idratare
  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "movie not found" });
    }

    // importo env per aggiungere l'URL completo dell'immagine
    const { APP_URL, APP_PORT } = process.env;

    // creo un oggetto dove far iterare i commenti dell utenti se ci sono
    const moviesComment = {
      id: results[0].movie_id,
      title: results[0].title,
      director: results[0].director,
      genre: results[0].genre,
      release_year: results[0].release_year,
      image: `${APP_URL}:${APP_PORT}/movies_cover/${results[0].image}`,
      reviews: [],
    };

    results.forEach((row) => {
      if (row.review_id) {
        moviesComment.reviews.push({
          review_id: row.review_id,
          review_name: row.review_name,
          vote: row.vote,
          comment: row.comment,
        });
      }
    });

    // console.log(movie);
    res.json(moviesComment);
  });
}

// definisco la funzione (post)
function store(req, res) {
  const movie_id = req.params.id;
  const { name, vote, text } = req.body;
  if (!movie_id || !name || !vote || !text) {
    return res.status(400).json({ error: "Campo obbligatorio" });
  }

  if (isNaN(vote)) {
    return res.status(400).json({ error: "Sono validi solo i numeri" });
  }
  const sql = `INSERT INTO reviews
    (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?)`;
  const values = [movie_id, name, vote, text];
  // eseguo la query con i valori da idratare
  connection.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results) {
      res.status(201).json({
        message: "Commento aggiunto con successo",
      });
    } 
  });
}

module.exports = { index, show, store };
