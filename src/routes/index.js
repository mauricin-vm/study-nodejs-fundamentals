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
      return res.end(JSON.stringify({
        message: search ? `Tarefas filtradas por "${search}"!` : `Lista de todas as tarefas!`,
        total: tasks.length,
        tasks
      }));
    }
  },
  {
    method: `POST`,
    path: buildRoutePath(`/tasks`),
    handler: (req, res) => {
      const { title, description } = req.body;
      if (!title || !description) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        messages: {
          title: !title ? `O título é obrigatório!` : null,
          description: !description ? `A descrição é obrigatória!` : null
        }
      }));
      const task = { id: randomUUID(), title, description, completed_at: null, created_at: new Date(), updated_at: new Date() };
      database.insert(`tasks`, task);
      return res.writeHead(201).end(JSON.stringify({
        message: `Tarefa criada com sucesso!`,
        task
      }));
    }
  },
  {
    method: `PUT`,
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      if (!id) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        message: `O ID da tarefa é obrigatório!`
      }));
      if (!title && !description) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        message: `É necessário informar pelo menos o título ou a descrição para atualização!`
      }));
      const tasks = database.select(`tasks`);
      const task = tasks.find(task => task.id === id);
      if (!task) return res.writeHead(404).end(JSON.stringify({
        error: `Tarefa não encontrada!`,
        message: `Não foi encontrada uma tarefa com o ID ${id}!`
      }));
      const updatedTask = { id, title: title ?? task.title, description: description ?? task.description, completed_at: task.completed_at, created_at: task.created_at, updated_at: new Date() };
      database.update(`tasks`, id, updatedTask);
      return res.writeHead(200).end(JSON.stringify({
        message: `Tarefa atualizada com sucesso!`,
        task: updatedTask
      }));
    }
  },
  {
    method: `PATCH`,
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      if (!id) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        message: `O ID da tarefa é obrigatório!`
      }));
      const tasks = database.select(`tasks`);
      const task = tasks.find(task => task.id === id);
      if (!task) return res.writeHead(404).end(JSON.stringify({
        error: `Tarefa não encontrada!`,
        message: `Não foi encontrada uma tarefa com o ID ${id}!`
      }));
      const updatedTask = { id, title: task.title, description: task.description, completed_at: task.completed_at ? null : new Date(), created_at: task.created_at, updated_at: new Date() };
      database.update(`tasks`, id, updatedTask);
      return res.writeHead(200).end(JSON.stringify({
        message: `Tarefa atualizada com sucesso!`,
        task: updatedTask
      }));
    }
  },
  {
    method: `DELETE`,
    path: buildRoutePath(`/tasks/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      if (!id) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        message: `O ID da tarefa é obrigatório!`
      }));
      const tasks = database.select(`tasks`);
      const task = tasks.find(task => task.id === id);
      if (!task) return res.writeHead(404).end(JSON.stringify({
        error: `Tarefa não encontrada!`,
        message: `Não foi encontrada uma tarefa com o ID ${id}!`
      }));
      database.delete(`tasks`, id);
      return res.writeHead(200).end(JSON.stringify({
        message: `Tarefa removida com sucesso!`
      }));
    }
  },
  {
    method: `GET`,
    path: buildRoutePath(`/users`),
    handler: (req, res) => {
      const { search } = req.query;
      const users = database.select(`users`, search ? { name: search, email: search } : null);
      return res.end(JSON.stringify({
        message: search ? `Usuários filtrados por "${search}"!` : `Lista de todos os usuários!`,
        total: users.length,
        users
      }));
    }
  },
  {
    method: `POST`,
    path: buildRoutePath(`/users`),
    handler: (req, res) => {
      const { name, email } = req.body;
      if (!name || !email) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        messages: {
          name: !name ? `O nome é obrigatório!` : null,
          email: !email ? `O email é obrigatório!` : null
        }
      }));
      const user = { id: randomUUID(), name, email };
      database.insert(`users`, user);
      return res.writeHead(201).end(JSON.stringify({
        message: `Usuário criado com sucesso!`,
        user
      }));
    }
  },
  {
    method: `PUT`,
    path: buildRoutePath(`/users/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      if (!id) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        message: `O ID do usuário é obrigatório!`
      }));
      if (!name && !email) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        message: `É necessário informar pelo menos o nome ou o email para atualização!`
      }));
      const users = database.select(`users`);
      const user = users.find(user => user.id === id);
      if (!user) return res.writeHead(404).end(JSON.stringify({
        error: `Usuário não encontrado!`,
        message: `Não foi encontrado um usuário com o ID ${id}!`
      }));
      const updatedUser = { id, name: name ?? user.name, email: email ?? user.email };
      database.update(`users`, id, updatedUser);
      return res.writeHead(200).end(JSON.stringify({
        message: `Usuário atualizado com sucesso!`,
        user: updatedUser
      }));
    }
  },
  {
    method: `DELETE`,
    path: buildRoutePath(`/users/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      if (!id) return res.writeHead(400).end(JSON.stringify({
        error: `Erro ao validar dados!`,
        message: `O ID do usuário é obrigatório!`
      }));
      const users = database.select(`users`);
      const user = users.find(user => user.id === id);
      if (!user) return res.writeHead(404).end(JSON.stringify({
        error: `Usuário não encontrado!`,
        message: `Não foi encontrado um usuário com o ID ${id}!`
      }));
      database.delete(`users`, id);
      return res.writeHead(200).end(JSON.stringify({
        message: `Usuário removido com sucesso!`
      }));
    }
  }
];