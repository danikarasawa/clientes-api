const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

// mongoose.connect("mongodb://localhost:27017/clientes", {useNewUrlParser: true}); // CONEXAO LOCAL 

// mongoose.connect("mongodb://admin:reprograma1@ds225902.mlab.com:25902/reprogramameli", {useNewUrlParser: true}); // CONEXAO NA NUVEM

// mongoose.connect("mongodb+srv://admin:admin123@reprograma-xazlh.mongodb.net/clientes", {useNewUrlParser: true});

// mongoose.connect("mongodb+srv://admin:MEU-CLUSTER-CRIADO@cluster0-dnqcd.mongodb.net/clientes", { useNewUrlParser: true }); //MEU CLUSTER NO MONGO ATLAS

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
  console.log("Conectada!")
});

const index = require("./routes/index")
const clientes = require("./routes/clientesRoutes")
const sessions = require("./routes/sessionRoute")

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(express.static("public"));

app.use(bodyParser.json());

app.use("/", index)
app.use("/clientes", clientes)
app.use("/sessions", sessions)

module.exports = app