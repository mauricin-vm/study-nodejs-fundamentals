//importar bibliotecas e funções
import fs from 'node:fs';
import { parse } from 'csv-parse';

//função para criar um delay fictício
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//definir o caminho do arquivo CSV
const csvPath = new URL('./tasks.csv', import.meta.url);

//criar stream de leitura
const stream = fs.createReadStream(csvPath);

//definir os parâmetros do csv-parse
const csvParse = parse({
  delimiter: `,`,
  skipEmptyLines: true,
  fromLine: 2
});

//função para executar a importação
async function run() {

  //definir a stream de leitura
  const linesParse = stream.pipe(csvParse);

  try {

    //definir o contador de tasks importadas
    let count = 0;
    console.log(`-------------------------------`);
    console.log(`Iniciando importação de tasks...\n`);

    //loop para importar as tasks
    for await (const line of linesParse) {
      const [title, description] = line;
      await delay(2000);
      const response = await fetch(`http://localhost:3333/tasks`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description })
      });
      if (!response.ok) {
        const error = await response.json();
        console.error(`Erro ao importar task "${title}":`, error);
        continue;
      };
      count++;
      console.log(`Tarefa importada com sucesso: ${title}`);
    };
    console.log(`\nImportação finalizada! ${count} tasks foram importadas.`);
  } catch (error) {
    console.error(`\nErro durante a importação:`, error.message);
  };
};

//executar a importação
run();
