const { createResponse } = require("../../common/utils");
const Customer = require("../../models/customer");

export const action = async (event, context, cb) => {
  try {
    const body = JSON.parse(event.body);
    const customer = await Customer.findByPk(body.id);
    if (customer) {
      customer.first_name = body.firstName;
      customer.last_name = body.lastName;
      customer.email = body.email;

      await customer.save();
      cb(null, createResponse(200, {}, "Customer Updated"));
    } else {
      cb(null, createResponse(404, {}, "Customer not found"));
    }
  } catch (error) {
    cb(error, null);
  } finally {
  }
};
