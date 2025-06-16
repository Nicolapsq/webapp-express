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
        if (err) return res.status(500).json({error: 'Database query failed'});
        res.json(results);
    });
};

// definisco la funzione show
function show(req, res) {
    const id = req.params.id;
    const sql = `
    SELECT movies.id AS "movies_id",
    movies.title,
    movies.director,
    movies.genre,
    movies.release_year,
    movies.image,
    reviews.id,
    reviews.name,
    reviews.vote,
    reviews.text
    FROM movies
    INNER JOIN reviews
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    `;
    // eseguo la query inserendo i valori da controllare
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({error: 'Database query failed'});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'movie not found'})
        }
        res.json(results[0]);
    });
};

module.exports = { index, show };