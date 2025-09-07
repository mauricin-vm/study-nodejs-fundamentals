//importar bibliotecas e funções
import http from 'node:http';
import json from './middleware/json.js';

//criar servidor
const server = http.createServer(async (req, res) => {

  //definir as constantes
  const { url, method } = req;

  //definir o middleware
  await json(req, res, next);

  //definir as rotas
  if (url === `/users` && method === `GET`) return res.end(`Listagem de usuários`);
  if (url === `/users` && method === `POST`) return res.end(`Criação de usuário`);

  //caso não encontre a rota
  res.end(`Erro ao encontrar rota!`);
});

//escutar porta
server.listen(3333, () => {
  console.log(`Server is running on port 3333!`);
});