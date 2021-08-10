const dbClient = require("../../config/database");
const {
  escapeAndExecuteQuery,
  transformDataForClient,
  createResponse
} = require("../../common/utils");

export const action = async (event, context, cb) => {
  try {
    await dbClient.connect();

    const query = "SELECT * FROM customr WHERE id=$1 AND deleted IS NOT TRUE;";
    const values = [event.pathParameters.id];

    const result = await escapeAndExecuteQuery(dbClient, query, values);

    const rows = transformDataForClient(result.rows);
    cb(
      null,
      rows.length > 0
        ? createResponse(200, rows[0])
        : createResponse(404, {}, "Customer not found")
    );
  } catch (error) {
    cb(error, null);
  } finally {
    dbClient.end();
  }
};
