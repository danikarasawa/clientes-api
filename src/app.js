const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

// mongoose.connect("mongodb://localhost:27017/clientes", {useNewUrlParser: true}); // CONEXAO LOCAL 

mongoose.connect("mongodb://admin:reprograma1@ds225902.mlab.com:25902/reprogramameli", {useNewUrlParser: true}); // CONEXAO NA NUVEM

let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function(){
  console.log("Conectada!")
});

const index = require("./routes/index")
const clientes = require("./routes/clientesRoutes")

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(bodyParser.json());

app.use("/", index)
app.use("/clientes", clientes)

module.exports = app