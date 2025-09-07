//importar bibliotecas e funções
import http from 'node:http';
import json from './middleware/json.js';
import { Database } from './database/database.js';

//instância do banco de dados
const database = new Database();

//criar servidor
const server = http.createServer(async (req, res) => {

  //definir as constantes
  const { url, method } = req;

  //definir o middleware
  await json(req, res);

  //definir as rotas
  if (url === `/users` && method === `GET`) {
    const users = database.select(`users`);
    return res.end(JSON.stringify(users));
  };
  if (url === `/users` && method === `POST`) {
    const { name, email } = req.body;
    database.insert(`users`, { name, email });
    return res.writeHead(201).end();
  };

  //caso não encontre a rota
  res.end(`Erro ao encontrar rota!`);
});

//escutar porta
server.listen(3333, () => {
  console.log(`Server is running on port 3333!`);
});