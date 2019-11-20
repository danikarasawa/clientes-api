const app = require("./src/app");
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    console.log('Servidor não encontrado. Corrige, amiga!');
  } else {
    console.log(`CLIENTES-API lindinha na ${port}`)
  };
});