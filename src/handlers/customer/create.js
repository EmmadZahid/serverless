const { createResponse } = require("../../common/utils");
const Customer = require("../../models/customer");
export const action = async (event, context, cb) => {
  try {
    const body = JSON.parse(event.body);
    const customer = Customer.build({
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email
    });
    await customer.save();
    cb(null, createResponse(201, {}));
  } catch (error) {
    cb(error, null);
  } finally {
  }
};
