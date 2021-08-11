const { createResponse } = require("../../common/utils");
const Customer = require("../../models/customer");
const getSequelize = require("../../config/database");

export const action = async (event, context, cb) => {
  try {
    const body = JSON.parse(event.body);
    await getSequelize().transaction(async t => {
      const customer = await Customer.findByPk(body.id);
      if (customer) {
        customer.first_name = body.firstName;
        customer.last_name = body.lastName;
        customer.email = body.email;

        await customer.save();
        return customer;
      } else {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
      }
    });

    cb(null, createResponse(200, {}, "Customer Updated"));
  } catch (error) {
    if (error.statusCode) {
      cb(null, createResponse(error.statusCode, {}, error.message));
    } else {
      cb(null, createResponse(500, {}, "Some error occurred"));
    }
  } finally {
  }
};
