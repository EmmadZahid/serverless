const { createResponse } = require("../../common/utils");
const Customer = require("../../models/customer");

export const action = async (event, context, cb) => {
  try {
    const customer = await Customer.findByPk(event.pathParameters.id);
    if (customer) {
      customer.deleted = true
      await customer.save();
      cb(null, createResponse(200, {}, "Customer Deleted"));
    } else {
      cb(null, createResponse(404, {}, "Customer not found"));
    }
  } catch (error) {
    cb(error, null);
  } finally {
  }
};
