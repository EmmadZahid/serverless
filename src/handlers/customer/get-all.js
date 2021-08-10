const {
  createResponse
} = require("../../common/utils");
const Customer = require("../../models/customer");
const { Op } = require("sequelize");

export const action = async (event, context, cb) => {
  try {
    const body = JSON.parse(event.body);
    const searchText = body.search//.toLowerCase()
    const response = await Customer.findAll({
      limit: body.pageSize,
      offset: body.pageNum > 0 ? body.pageNum : 0,
      order: [["first_name", body.sort === "asc" ? "ASC" : "DESC"]],
      where:{
        [Op.or]:[
          {
            first_name:{
              [Op.iLike]: `${searchText}%`
            }
          },
          {
            last_name:{
              [Op.iLike]: `${searchText}%`
            }
          }
        ]
      }
    });
    cb(null, createResponse(200, response));
  } catch (error) {
    cb(error, null);
  } finally {

  }
};
