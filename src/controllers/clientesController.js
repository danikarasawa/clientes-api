const Clientes = require('../model/clientes');
const fs = require('fs');

//POST
exports.post = (req, res) => {
    const clientes = new clientesBD(req.body);
    Clientes.save(function (err) {
        if (err) res.status(500).send(err);
        res.status(201).send(clientes);
    })

};

//GET
exports.get = (req, res) => {
    clientesBD.find(function (err, clientes) {
        if (err) res.status(500).send(err);
        res.status(200).send(clientes);
    });
};

exports.getBuy = (req, res) => {
    clientesBD.find(function (err, clientes) {
        if (err) res.status(500).send(err);
        const realizouCompra = clientes.filter(item => item.comprou == true);
        const compradoresLista = realizouCompra.map(item => item.nome && item.email)
    })
};

exports.getByCPF = (req, res) => {
    const clienteCPF = req.params.cpf
    Clientes.findById(clienteCPF, function (err, clientes) {
        if (err) return res.status(500).send(err);

        if (!clientes) {
            return res.status(200).send({ message: `Infelizmente não localizamos esse cliente: ${clienteCPF}` });
        }
        res.status(200).send(clientes)
    })
};



