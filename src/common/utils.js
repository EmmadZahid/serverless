async function escapeAndExecuteQuery(client, query, values) {
  return client.query({
    // rowMode: 'array',
    text: query,
    values
  });
}

let camelCaseToSnakeCase = camelCase => {
  return camelCase.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

let snakeCaseToCamelCase = snakeCase => {
  return snakeCase.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace("-", "")
      .replace("_", "")
  );
};

let transformDataForClient = items => {
  if (typeof items === Array) {
    return items.map(item => {
      const newItem = {};
      for (let key in item) {
        newItem[snakeCaseToCamelCase(key)] = item[key];
      }
      return newItem;
    });
  } else {
    const newItem = {};
      for (let key in items) {
        newItem[snakeCaseToCamelCase(key)] = items[key];
      }
      return newItem;
  }
};

let createResponse = (status, body, message) => {
  const newBody = body;
  if (message) {
    newBody.message = message;
  }
  const response = {
    statusCode: status,
    body: JSON.stringify(newBody)
  };

  return response;
};
module.exports = {
  escapeAndExecuteQuery,
  camelCaseToSnakeCase,
  snakeCaseToCamelCase,
  transformDataForClient,
  createResponse
};
