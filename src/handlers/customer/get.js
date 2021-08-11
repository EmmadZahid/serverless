const dbClient = require("../../config/database");
const {
  transformDataForClient,
  createResponse
} = require("../../common/utils");

export const action = async (event, context, cb) => {
  try {
    await dbClient.connect();

    const query = "SELECT * FROM customer WHERE id=$1 AND deleted IS NOT TRUE;";
    const values = [event.pathParameters.id];

    const result = await dbClient.query(query, values);

    const rows = transformDataForClient(result.rows);
    cb(
      null,
      rows.length > 0
        ? createResponse(200, rows[0])
        : createResponse(400, {}, "Customer not found")
    );
  } catch (error) {
    cb(null, createResponse(500, {}, "Some error occurred"));
  } finally {
    dbClient.end();
  }
};
