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
  return items.map(item => {
    const newItem = {};
    for (let key in item) {
      newItem[snakeCaseToCamelCase(key)] = item[key];
    }
    return newItem;
  });
};

let createResponse = (status, body, message) => {
    const newBody = body
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
