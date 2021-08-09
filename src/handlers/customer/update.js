const dbClient = require("../../config/database");
const { escapeAndExecuteQuery, createResponse } = require("../../common/utils");

export const action = async (event, context, cb) => {
  try {
    await dbClient.connect();
    const body = JSON.parse(event.body);

    const query = "UPDATE customer set first_name=$1, last_name=$2, email=$3 WHERE id=$4;";
    const values = [body.firstName, body.lastName, body.email, body.id];
    const result = await escapeAndExecuteQuery(dbClient, query, values);

    if(result.rowCount > 0)
      cb(null, createResponse(200, {}, "Customer Updated"));
    else
      cb(null, createResponse(404, {}, "Customer not found"));
  } catch (error) {
    cb(error, null);
  } finally {
    dbClient.end();
  }
};
