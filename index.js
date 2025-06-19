// importazione di express
const express = require("express");
// importo CORS
const cors = require("cors");
// importo dotenv
require("dotenv").config();
// importo notFound
const notFound = require("./middlewares/error/notFound");
// importo errorHandler
const chechError = require("./middlewares/error/errorHandler");
// importo routers/movies
const moviesRouter = require("./routers/moviesRouter");

const app = express();

const {APP_URL, APP_PORT, VITE_FRONTEND_API_URL} = process.env;

const port = APP_PORT;

// Abilita tutte le origini (accesso solo al dominio 5173)
app.use(cors({
    origin: VITE_FRONTEND_API_URL
}));

// MIDDLEWARE
// inclusione di tutte le rotte statiche
app.use(express.static("public"));

//parsing automatico del corpo delle richieste in json (bodyparser)
app.use(express.json());

// multer


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
    console.log(`Server in ascolto su ${APP_URL}:${port}`);
});
