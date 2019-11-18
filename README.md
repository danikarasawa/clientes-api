<h2>Projeto Prático | Semana 11 | Back-end | {reprograma} + Mercado Livre</h2>

Exercício prático de construção básica de API com rotas para GET e POST.

```
O Seu projeto deverá conter as seguintes rotas/endpoints com os respectivos retornos:
POST/clientes
Incluir um novo cliente conforme as característisticas informadas no contrato do model. (HTTP 201 OK)
Resposta:
{
    "status": true,
    "mensagem": "Aluna incluida com sucesso"
}


GET/clientes
Retornar a lista com todos os clientes (HTTP 200 OK)
Resposta:
[
    {
        "_id": "5dcd81f42e2aab923cbd653d",
        "email": "marilia.oliveira@outlook.com",
        "nome": "Marilia Messias",
        "cpf": 1234567890,
        "dataNascimento": "1992-04-03T03:00:00.000Z",
        "estadoCivil": "Solteira",
        "telefone": 123456789,
        "comprou": true
    }
]

GET/clientes/compradores
Retorna a lista com os clientes que já realizaram alguma compra (HTTP 200 OK)
Resposta:
[
    {
        "nome": "Marilia Messias",
        "email": "marilia.oliveira@outlook.com"
    },
    {
        "nome": "Joaquina Messias",
        "email": "marilia.oliveira@outlook.com"
    },
    {
        "nome": "Ana Messias",
        "email": "marilia.oliveira@outlook.com"
    },
    {
        "nome": "Camila Messias",
        "email": "marilia.oliveira@outlook.com"
    }
]

GET/clientes/{cpf}
Retornar a lista de clientes de acordo com o elemento informado como parâmetro (HTTP 200 OK)
Resposta:
[
    {
        "_id": "5dcd82ad5777b7b184ae38e3",
        "email": "marilia.oliveira@outlook.com",
        "nome": "Joaquina Messias",
        "cpf": 123456789,
        "dataNascimento": "1992-04-03T03:00:00.000Z",
        "estadoCivil": "Solteira",
        "telefone": 123456789,
        "comprou": true
    }
]
```