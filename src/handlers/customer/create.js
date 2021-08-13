const Customer = require("../../models/customer");
const vandium = require("vandium");

export const action = vandium
  .api()
  .POST()
  .validation({
    body: {
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
    const customer = Customer.build({
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email
    });
    await customer.save();
    return;
  });
