//importar bibliotecas e funções
import http from 'node:http';
import json from './middleware/json.js';
import { routes } from './routes/index.js';
import { extractQueryParams } from './utils/index.js';

//criar servidor
const server = http.createServer(async (req, res) => {

  //definir as constantes
  const { url, method } = req;

  //definir o middleware
  await json(req, res);

  //definir as rotas
  const route = routes.find(route => route.method === method && route.path.test(url));
  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;
    req.query = query ? extractQueryParams(query) : {};
    req.params = { ...params };
    return route.handler(req, res);
  };

  //caso não encontre a rota
  res.end(`Erro ao encontrar rota!`);
});

//escutar porta
server.listen(3333, () => {
  console.log(`Server is running on port 3333!`);
});