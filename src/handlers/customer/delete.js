const dbClient = require("../../config/database");
const { createResponse } = require("../../common/utils");

export const action = async (event, context, cb) => {
  try {
    await dbClient.connect();

    const query = "UPDATE customer SET deleted=true WHERE id=$1;";
    const values = [event.pathParameters.id];

    const result = await dbClient.query(query, values);
    if (result.rowCount > 0) cb(null, createResponse(200, {}, "Customer deleted"));
    else cb(null, createResponse(400, {}, "Customer not found"));
  } catch (error) {
    cb(null, createResponse(500, {}, "Some error occurred"));
  } finally {
    dbClient.end();
  }
};
