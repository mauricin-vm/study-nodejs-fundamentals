//importar bibliotecas e funções
import { Database } from '../database/database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from '../utils/index.js';

//instância do banco de dados
const database = new Database();

//exportar rotas
export const routes = [
  {
    method: `GET`,
    path: buildRoutePath(`/users`),
    handler: (req, res) => {
      const users = database.select(`users`);
      return res.end(JSON.stringify(users));
    }
  },
  {
    method: `POST`,
    path: buildRoutePath(`/users`),
    handler: (req, res) => {
      const { name, email } = req.body;
      database.insert(`users`, { id: randomUUID(), name, email });
      return res.writeHead(201).end();
    }
  },
  {
    method: `PUT`,
    path: buildRoutePath(`/users/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      database.update(`users`, id, { name, email });
      return res.writeHead(204).end();
    }
  },
  {
    method: `DELETE`,
    path: buildRoutePath(`/users/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      database.delete(`users`, id);
      return res.writeHead(204).end();
    }
  }
];