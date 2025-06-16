// definisco la funzione index ( da modificare per l'errore)
function notFound(req, res, next) {
    res.status(404)
    res.json({
        error: "pagina non trovata"
    });
};

module.exports = notFound;
