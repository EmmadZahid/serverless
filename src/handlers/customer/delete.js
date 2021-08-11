const { createResponse } = require("../../common/utils");
const Customer = require("../../models/customer");
const getSequelize = require("../../config/database");

export const action = async (event, context, cb) => {
  const t = await getSequelize().transaction();
  try {
    const customer = await Customer.findByPk(event.pathParameters.id, {
      transaction: t
    });
    if (customer) {
      customer.deleted = true;
      await customer.save({ transaction: t });
      await t.commit();
      cb(null, createResponse(200, {}, "Customer Deleted"));
    } else {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    await t.rollback();
    if (error.statusCode) {
      cb(null, createResponse(error.statusCode, {}, error.message));
    } else {
      cb(null, createResponse(500, {}, "Some error occurred"));
    }
  } finally {
  }
};
