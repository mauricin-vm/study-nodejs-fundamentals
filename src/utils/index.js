//função para construir a URL
export const buildRoutePath = (path) => {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(routeParametersRegex, `(?<$1>[a-z0-9\-_]+)`);
  return new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
};

//função para extrair a query da URL
export const extractQueryParams = (query) => {
  return query.substr(1).split(`&`).reduce((queryParams, param) => {
    const [key, value] = param.split(`=`);
    queryParams[key] = value;
    return queryParams;
  }, {});
};