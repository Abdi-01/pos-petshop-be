const model = require("../models");
const sequelize = require("sequelize");

module.exports = {
    addTransaction: async (req, res, next) => {
        try {
            let get = await model.users.findAll({
                where: {
                    uu_id: req.decript.uu_id
                }
            })

            console.log(`get id`, get[0].dataValues.id);

            let transaction = await model.transaction.create({
                user_id: get[0].dataValues.id
            })
            console.log(`output transaction:`, transaction);
            console.log("props order data cart", req.body.order)

            let newArr = req.body.order.map((val, idx) => {
                delete val.name
                return { ...val, transaction_id: transaction.dataValues.id };
            })

            console.log(`new array`, newArr);

            let transactionDetail = await model.order.bulkCreate(newArr)

            console.log(`ini transDetail: `, transactionDetail);

            res.status(200).send({
                status: true,
                message: "transaction success"
            })

        } catch (error) {
            next(error)
        }
    },


}