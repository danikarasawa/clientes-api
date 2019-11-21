const Clientes = require('../model/clientes');

//POST
exports.postClient = (req, res) => {
    const clientes = new Clientes(req.body);
    clientes.save(function (err) {
        if (err) res.status(500).send("O que está errado, não está certo");
        res.status(201).send({
            status: true,
            message: 'Novo cliente inserido com sucesso!'
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

//MEU CÓDIGO PARA O GETBUY
// exports.getBuy = (req, res) => {
//     Clientes.find(function (err, clientes) {
//         if (err) res.status(500).send(err);
//         const realizouCompra = clientes.filter(item => item.comprou == true);
//         const compradoresLista = realizouCompra.map(item => item.nome && item.email);

//         res.status(200).send(compradoresLista);
//     });
// };

exports.getBuy = (req, res) => {
    Clientes.find({ comprou: true }, function (err, clientes) {
        if (err) res.status(500).send(err);

        const compradoresLista = clientes.map(item => {
            return {
                nome: item.nome,
                email: item.email
            }

        });

        res.status(200).send(compradoresLista);
    });
};

//DÁ PRA USAR A MESMA LÓGIA DO GETBUY
// exports.getByCPF = (req, res) => {
//     const clienteCPF = req.params.cpf
//     Clientes.find(clienteCPF, function (err, clientes) {

//         if (!clientes) {
//             return res.status(500).send({ message: `Infelizmente não localizamos esse cliente: ${clienteCPF}` });
//         } else {
//             const compradorCPF = clientes.find(item => item.cpf == cpf);
//             res.status(200).send(compradorCPF);
//         }
//     });
// };

exports.getByCPF = (req, res) => {
    const cpf = req.params.cpf
    Clientes.find({ cpf }, function (err, clientes) {
        if (err) res.status(500).send({ message: `Infelizmente não localizamos esse cliente: ${cpf}` });
        res.status(200).send(clientes);
    })
};

exports.updateCPF = (req, res) => {
    Clientes.update(
        { cpf: req.params.cpf },
        { $set: req.body },
        { upsert: true },
        function (err) {
            if (err) return res.status(500).send({ message: err });
            res.status(200).send({ message: "Atualizado com sucesso!" });
        })
        };

        //OUTRA FORMA DE DECLARAR
        // const cpf = req.params.cpf
        // Clientes.update(
        //     {cpf}...
        // )