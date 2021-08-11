const dbClient = require("../../config/database");
const { createResponse } = require("../../common/utils");

export const action = async (event, context, cb) => {
  try {
    await dbClient.connect();
    const body = JSON.parse(event.body);

    const query =
      "INSERT INTO customer (first_name, last_name, email) VALUES ($1, $2, $3);";
    const values = [body.firstName, body.lastName, body.email];
    await dbClient.query(query, values);
    cb(null, createResponse(201, {}));
  } catch (error) {
    cb(null, createResponse(500, {}, "Some error occurred"));
  } finally {
    dbClient.end();
  }
};
