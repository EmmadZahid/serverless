const dbClient = require("../../config/database");
const { escapeAndExecuteQuery, createResponse } = require("../../common/utils");

export const action = async (event, context, cb) => {
  try {
    await dbClient.connect();
    const body = JSON.parse(event.body);
    console.log(body);

    const query = "INSERT INTO customer (first_name, last_name, email) VALUES ($1, $2, $3);";
    const values = [body.firstName, body.lastName, body.email];
    await escapeAndExecuteQuery(dbClient, query, values);
    cb(null, createResponse(201, {}));
  } catch (error) {
    cb(error, null);
  } finally {
    dbClient.end();
  }
};
