//importar bibliotecas e funções
import { Database } from '../database/database.js';
import { randomUUID } from 'node:crypto';

//instância do banco de dados
const database = new Database();

//exportar rotas
export const routes = [
  {
    method: `GET`,
    path: `/users`,
    handler: (req, res) => {
      const users = database.select(`users`);
      return res.end(JSON.stringify(users));
    }
  },
  {
    method: `POST`,
    path: `/users`,
    handler: (req, res) => {
      const { name, email } = req.body;
      database.insert(`users`, { id: randomUUID(), name, email });
      return res.writeHead(201).end();
    }
  },
];