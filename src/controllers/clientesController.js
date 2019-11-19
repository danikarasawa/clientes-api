const Clientes = require('../model/clientes');

//POST
exports.post = (req, res) => {
    const clientes = new Clientes(req.body);
    clientes.save(function (err) {
        if (err) res.status(500).send(err);
        res.status(201).send({
            "status": true,
            "message": 'Novo cliente inserido com sucesso!'
        });
    });
};

//GET
exports.get = (req, res) => {
    Clientes.find(function (err, clientes) {
        if (err) res.status(500).send(err);
        res.status(200).send(clientes);
    });
};

exports.getBuy = (req, res) => {
    Clientes.find(function (err, clientes) {
        if (err) res.status(500).send(err);
        const realizouCompra = clientes.filter(item => item.comprou == true);
        const compradoresLista = realizouCompra.map(item => item.nome && item.email);

        res.status(200).send(compradoresLista);
    });
};

exports.getByCPF = (req, res) => {
    const clienteCPF = req.params.cpf
    Clientes.find(clienteCPF, function (err, clientes) {
        
        if (!clientes) {
            return res.status(500).send({ message: `Infelizmente não localizamos esse cliente: ${clienteCPF}` });
        } else{
            const compradorCPF = clientes.find(item => item.cpf == cpf);
        }
        res.status(200).send(compradorCPF);
    });
};