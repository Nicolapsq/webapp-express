// definisco la funzione del controllo degli errori
function chechError(err, req, res, next) {
    console.log(err);
    res.status(500);
    res.json({
        message: "errore nel codice",
        // message: err
    });
};

module.exports = chechError;