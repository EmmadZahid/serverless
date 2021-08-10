const { transformDataForClient, createResponse } = require("../../common/utils");
const Customer = require("../../models/customer");
export const action = async (event, context, cb) => {
  try {
    const customer = await Customer.findByPk(event.pathParameters.id);
    const response = (customer) ? transformDataForClient(customer.dataValues) : createResponse(404,{},"Customer not found")
    cb(null, response);
  } catch (error) {
    cb(error, null);
  } finally {
  }
};
