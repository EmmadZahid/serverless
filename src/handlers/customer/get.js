const {
  transformDataForClient
} = require("../../common/utils");
const Customer = require("../../models/customer");
const vandium = require("vandium");


export const action = vandium
  .api()
  .GET()
  .handler(async event => {
    const customer = await Customer.findByPk(event.pathParameters.id);
    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 400;
      throw error;
    }
    return transformDataForClient(customer.dataValues);
  });
