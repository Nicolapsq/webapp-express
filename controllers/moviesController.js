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
function show((req, results) {
    const id = use.params.id;
    const sql = `
    SELECT title AS "titolo_del_film"
    FROM movies
    `;
        // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: 'Database query failed'});
        res.json(results);
    });
})

module.exports = { index, show };