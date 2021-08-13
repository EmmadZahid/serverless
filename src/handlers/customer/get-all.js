const Customer = require("../../models/customer");
const { Op } = require("sequelize");
const vandium = require("vandium");

export const action = vandium
  .api()
  .POST()
  .validation({
    body: {
      search: vandium.types.string().valid(''),
      pageSize: vandium.types
        .number()
        .min(1)
        .required(),
      pageNum: vandium.types
        .number()
        .min(0)
        .required(),
      sort: vandium.types
        .string()
        .valid("asc", "desc")
        .insensitive()
    }
  })
  .handler(async event => {
    const body = event.body;
    const searchText = body.search;
    const sort = (body.sort) ? body.sort.toLowerCase() : null
    const response = await Customer.findAll({
      limit: body.pageSize,
      offset: body.pageNum > 0 ? body.pageNum : 0,
      order: [["first_name", sort === "asc" ? "ASC" : "DESC"]],
      where: {
        [Op.or]: [
          {
            first_name: {
              [Op.iLike]: `${searchText}%`
            }
          },
          {
            last_name: {
              [Op.iLike]: `${searchText}%`
            }
          }
        ]
      }
    });
    return response;
  });
