// importazione di express
const express = require("express");
// importo dotenv
require("dotenv").config();
// importo notFound
const notFound = require("./middlewares/error/notFound");
// importo errorHandler
const chechError = require("./middlewares/error/errorHandler");
// importo routers/movies
const moviesRouter = require("./routers/movies");

const app = express();

const {APP_URL, APP_PORT} = process.env;

const port = APP_PORT;

// MIDDLEWARE
// inclusione di tutte le rotte statiche
app.use(express.static("public"));

//parsing automatico del corpo delle richieste in json (bodyparser)
app.use(express.json());

//ROUTERS
app.get("/", (req, res) => {
    res.json("progetto webapp-express");
});

// importo tutte le rotte da routers/movies
// da posizionare sempre dopo i middleware, ma non quelli della gestione degli errori
app.use("/movies", moviesRouter);

// Middleware per la gestione degli errori:
// pagine non esistenti:
app.use(notFound);
// gestioni errori:
app.use(chechError);

app.listen(port, () => {
    console.log("Server in ascolto su http://localhost:" + port);
});
