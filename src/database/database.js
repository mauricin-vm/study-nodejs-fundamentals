//importar bibliotecas e funções
import fs from 'node:fs/promises';

//definir diretório do banco de dados
const DB_FILE_PATH = new URL(`./db.json`, import.meta.url);

//criar banco de dados
export class Database {

  //definir constante
  #database = {};

  //criar construtor
  constructor() {
    fs.readFile(DB_FILE_PATH, `utf-8`).then(data => {
      this.#database = JSON.parse(data);
    }).catch(() => {
      this.#persist();
    });
  };

  //função para persistir dados no banco de dados
  #persist() {
    fs.writeFile(DB_FILE_PATH, JSON.stringify(this.#database));
  };

  //função para selecionar dados do banco de dados
  select(table) {
    return this.#database[table] ?? [];
  };

  //função para inserir dados no banco de dados
  insert(table, data) {
    if (Array.isArray(this.#database[table])) this.#database[table].push(data);
    else this.#database[table] = [data];
    this.#persist();
    return data;
  };

  //função para atualizar dados no banco de dados
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    };
    this.#persist();
    return this.#database[table][rowIndex];
  };

  //função para deletar dados no banco de dados
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    };
    return this.#database[table][rowIndex];
  };
};