const Customer = require("../../models/customer");
const sequelize = require("../../config/database");
const vandium = require("vandium");

export const action = vandium
  .api()
  .DELETE()
  // .validation({
  //   requestParameters:{
  //     id: vandium.types.number().required()
  //   }
  // })
  .handler(async event => {
    const t = await sequelize.transaction();
    try {
      const customer = await Customer.findByPk(event.pathParameters.id, {
        transaction: t
      });
      if (!customer) {
        const error = new Error("Customer not found");
        error.statusCode = 404;
        throw error;
      }
      customer.deleted = true;
      await customer.save({ transaction: t });
      await t.commit();
      return { body: "Customer deleted" };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  });
