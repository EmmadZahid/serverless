const dbClient = require("../../config/database");
const {
  transformDataForClient,
  createResponse
} = require("../../common/utils");
export const action = async (event, context, cb) => {
  try {
    await dbClient.connect();
    //pageSize, pageNum, sort, search
    const body = JSON.parse(event.body);
    let query = `SELECT * FROM customer `;
    if (body.search && body.search.length > 0) {
      const searchText = body.search.toLowerCase()
      query += ` WHERE (LOWER(first_name) LIKE '${searchText}%' OR last_name LIKE '${searchText}%') AND deleted IS NOT TRUE `;
    } else{
      query += ` WHERE deleted IS NOT TRUE `
    }

    if (body.sort) {
      query += `ORDER BY first_name `;
      if (body.sort == "asc") {
        query += "ASC ";
      } else if (body.sort == "desc") {
        query += "DESC ";
      }
    }

    if (body.pageNum > 0) {
      const offset = body.pageSize * body.pageNum;
      query += `OFFSET ${offset} `;
    }

    query += `LIMIT ${body.pageSize}`;
    
    const result = await dbClient.query(query);
    const rows = transformDataForClient(result.rows);
    cb(null, createResponse(200, rows));
  } catch (error) {
    cb(error, null);
  } finally {
    dbClient.end();
  }
};
