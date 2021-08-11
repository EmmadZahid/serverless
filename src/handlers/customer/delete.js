const dbClient = require("../../config/database");
const { createResponse } = require("../../common/utils");

export const action = async (event, context, cb) => {
  try {
    await dbClient.connect();

    const query = "UPDATE customer SET deleted=true WHERE id=$1;";
    const values = [event.pathParameters.id];

    const result = await dbClient.query(query,values);
    if(result.rowCount > 0)
      cb(null, createResponse(200, {}, "Item deleted"));
    else
      cb(null, createResponse(400, {}, "Item not deleted"));
  } catch (error) {
    cb(error, null);
  } finally {
    dbClient.end();
  }
};
