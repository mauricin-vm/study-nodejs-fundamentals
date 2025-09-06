//importar bibliotecas e funções
import http from 'node:http';

//criar servidor
const server = http.createServer((req, res) => {
  res.end('Hello World!');
});

//escutar porta
server.listen(3333, () => {
  console.log(`Server is running on port 3333!`);
});