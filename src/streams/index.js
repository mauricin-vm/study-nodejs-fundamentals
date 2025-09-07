//importar bibliotecas e funções
import { Readable, Writable, Transform } from 'node:stream';

//criar stream de leitura
class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) this.push(null);
      else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      };
    }, 1000);
  };
};
new OneToHundredStream().pipe(process.stdout);

//criar stream de escrita
class MultipliedByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  };
};
new OneToHundredStream().pipe(new MultipliedByTenStream());

//criar stream de transformação
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  };
};
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultipliedByTenStream());