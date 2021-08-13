const { createResponse } = require("../../common/utils");
const Customer = require("../../models/customer");
const sequelize = require("../../config/database");
const vandium = require("vandium");

export const action = vandium
  .api()
  .POST()
  .validation({
    body: {
      id: vandium.types
        .number()
        .min(1)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              case "string.empty":
                err.message = `${err.local.label} should not be empty!`;
                break;
              case "string.min":
                err.message = `${err.local.label} should be a valid id!`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      firstName: vandium.types
        .string()
        .max(50)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              case "string.empty":
                err.message = `${err.local.label} should not be empty!`;
                break;
              case "string.max":
                err.message = `${err.local.label} should have at most ${err.local.limit} characters!`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      lastName: vandium.types
        .string()
        .max(50)
        .required()
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              case "string.empty":
                err.message = `${err.local.label} should not be empty!`;
                break;
              case "string.max":
                err.message = `${err.local.label} should have at most ${err.local.limit} characters!`;
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      email: vandium.types
        .string()
        .max(150)
        .email()
        .error(errors => {
          errors.forEach(err => {
            switch (err.code) {
              case "string.max":
                err.message = `${err.local.label} should have at most ${err.local.limit} characters!`;
                break;
              case "string.email":
                err.message = `${err.local.label} should be valid!`;
                break;
              default:
                break;
            }
          });
          return errors;
        })
    }
  })
  .handler(async event => {
    const body = event.body;
    await sequelize.transaction(async t => {
      const customer = await Customer.findByPk(body.id);
      if (customer) {
        customer.first_name = body.firstName;
        customer.last_name = body.lastName;
        customer.email = body.email;

        await customer.save();
        return customer;
      } else {
        const error = new Error("Customer not found");
        error.statusCode = 400;
        throw error;
      }
    });
    return;
  });
