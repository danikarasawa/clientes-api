const mongoose = require('mongoose');

const ClientesSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String, required: true },
    cpf: { type: Number },
    dataNascimento: { type: Date },
    estadoCivil: { type: String },
    telefone: { type: Number },
    comprou: { type: Boolean }
}, {
    versionKey: false
});

//PODE SER APENAS O MODULE.EXPORTS, A CONST FOI SÓ PARA ILUSTRAR O FLUXO 
const clientesBD = mongoose.model('Clientes', ClientesSchema);
module.exports = clientesBD;