const model = require("../models");
const sequelize = require("sequelize");

module.exports = {
    addTransaction: async (req, res, next) => {
        try {
            console.log(`ini dari token`, req.decript);
            let transaction = await model.transaction.create({
                user_id: req.decript.id
            })
            res.status(200).send(transaction)

            let transactionDetail = await model.order.create({
                transaction_id: transaction.id
            })


        } catch (error) {
            next(error)
        }
    },


}