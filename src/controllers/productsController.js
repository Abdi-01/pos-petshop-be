const model = require("../models");
const sequelize = require("sequelize");

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            console.log(`ini reqbody getallproducts`, req.body);
            let products = await model.products.findAll({
                // attributes : ["name"],
                where: {
                    uu_id: req.body.uu_id
                }
            })
            console.log(products);

        } catch (error) {
            next(error)
        }
    }

}