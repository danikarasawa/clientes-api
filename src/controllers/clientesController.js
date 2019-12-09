const Clientes = require('../model/clientes');
const bcrypt = require("bcryptjs");
const bcryptSalt = 8;

//POST

exports.postClient = async (req, res) => { 
    const { nome, email, cpf, password, dataNascimento, estadoCivil, telefone, comprou } = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    try {
      const hashPass = await bcrypt.hashSync(password, salt);
      Clientes.push({ nome, email, cpf, hashPass, dataNascimento, estadoCivil, telefone, comprou });
    
      fs.writeFile("./src/model/clientes", JSON.stringify(Clientes), 'utf8', function (err) {
        if (err) {
          return res.status(500).send({ message: err });
        }
        console.log("The file was saved!");
      }); 
      return res.status(201).send(Clientes); 
    } catch (e) {
      return res.status(401).json({ error: 'erro' });
    }
  }



//GET
exports.get = (req, res) => {
    Clientes.find(function (err, clientes) { //findOne é equivalente ao findById
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
    if (!validaFormulario(req.body)) return res.status(400).send({ message: "Campos inválidos" });
    Clientes.update(
        { cpf: req.params.cpf },
        { $set: req.body },
        { upsert: true },
        function (err) {
            if (err) return res.status(500).send({ message: err });
            res.status(200).send({ message: "Atualizado com sucesso!" });
        })
};

exports.removeID = (req, res) => {
    const cpfCliente = req.params.cpf;

    Clientes.find(cpfCliente, function (err, cliente) {
        if (err) return res.status(500).send(err);
        if (!cliente) {
            return res.status(200).send({ message: `Infelizmente o CPF ${cpfCliente} não consta em nosso grupo de clientes` })
        }
        cliente.remove(function (err) {
            if (!err) {
                res.status(204).send({ message: "Aluna removida com sucesso" }); //204 É UMA AÇÃO SEM INFORMAÇÃO - A AÇÃO FOI CONCLUÍDA COM SUCESSO, MAS NÃO RETORNOU INFORMAÇÃO 
            }
        })
    })
};

//OUTRA FORMA DE DECLARAR
// const cpf = req.params.cpf
// Clientes.update(
//     {cpf}...
// )

//VALIDACAO
const validaFormulario = (campos) => {
    const schema = {
        nome: Joi.string().min(1).required(),
        email: Joi.string().min(1).required(),
    }
    const validation = Joi.validate(campos, schema);
    if (validation.error) {
        return false;
    }
    return true;
}