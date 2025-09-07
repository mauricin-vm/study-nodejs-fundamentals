//middleware para parsear o corpo da requisição em JSON
const json = async (req, res, next) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  };
  res.setHeader('Content-Type', 'application/json');
};
export default json;