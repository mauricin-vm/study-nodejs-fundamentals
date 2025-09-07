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
    path: buildRoutePath(`/tasks`),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = database.select(`tasks`, search ? { title: search, description: search } : null);
      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: `POST`,
    path: buildRoutePath(`/tasks`),
    handler: (req, res) => {
      const { title, description } = req.body;
      if (!title || !description) return res.writeHead(400).end(JSON.stringify({ error: `O título e a descrição são obrigatórios!` }));
      const task = { id: randomUUID(), title, description, completed_at: null, created_at: new Date(), updated_at: new Date() };
      database.insert(`tasks`, task);
      return res.writeHead(201).end();
    }
  },
  {
    method: `PUT`,
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      if (!title && !description) return res.writeHead(400).end(JSON.stringify({ error: `O título e a descrição são obrigatórios!` }));
      const tasks = database.select(`tasks`);
      const task = tasks.find(task => task.id === id);
      if (!task) return res.writeHead(404).end(JSON.stringify({ error: `Tarefa não encontrada!` }));
      const updatedTask = { id, title: title ?? task.title, description: description ?? task.description, completed_at: task.completed_at, created_at: task.created_at, updated_at: new Date() };
      database.update(`tasks`, id, updatedTask);
      return res.writeHead(204).end();
    }
  },
  {
    method: `PATCH`,
    path: buildRoutePath(`/tasks/:id/complete`),
    handler: (req, res) => {
      const { id } = req.params;
      const tasks = database.select(`tasks`);
      const task = tasks.find(task => task.id === id);
      if (!task) return res.writeHead(404).end(JSON.stringify({ error: `Tarefa não encontrada!` }));
      const updatedTask = { id, title: task.title, description: task.description, completed_at: task.completed_at ? null : new Date(), created_at: task.created_at, updated_at: new Date() };
      database.update(`tasks`, id, updatedTask);
      return res.writeHead(204).end();
    }
  },
  {
    method: `DELETE`,
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      const tasks = database.select(`tasks`);
      const task = tasks.find(task => task.id === id);
      if (!task) return res.writeHead(404).end(JSON.stringify({ error: `Tarefa não encontrada!` }));
      database.delete(`tasks`, id);
      return res.writeHead(204).end();
    }
  },
  {
    method: `GET`,
    path: buildRoutePath(`/users`),
    handler: (req, res) => {
      const { search } = req.query;
      const users = database.select(`users`, search ? { name: search, email: search } : null);
      return res.end(JSON.stringify(users));
    }
  },
  {
    method: `POST`,
    path: buildRoutePath(`/users`),
    handler: (req, res) => {
      const { name, email } = req.body;
      if (!name || !email) return res.writeHead(400).end(JSON.stringify({ error: `Nome e email são obrigatórios!` }));
      const user = { id: randomUUID(), name, email };
      database.insert(`users`, user);
      return res.writeHead(201).end();
    }
  },
  {
    method: `PUT`,
    path: buildRoutePath(`/users/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      if (!name && !email) return res.writeHead(400).end(JSON.stringify({ error: `Nome ou email são obrigatórios!` }));
      const users = database.select(`users`);
      const user = users.find(user => user.id === id);
      if (!user) return res.writeHead(404).end(JSON.stringify({ error: `Usuário não encontrado!` }));
      const updatedUser = { id, name: name ?? user.name, email: email ?? user.email };
      database.update(`users`, id, updatedUser);
      return res.writeHead(204).end();
    }
  },
  {
    method: `DELETE`,
    path: buildRoutePath(`/users/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      const users = database.select(`users`);
      const user = users.find(user => user.id === id);
      if (!user) return res.writeHead(404).end(JSON.stringify({ error: `Usuário não encontrado!` }));
      database.delete(`users`, id);
      return res.writeHead(204).end();
    }
  }
];