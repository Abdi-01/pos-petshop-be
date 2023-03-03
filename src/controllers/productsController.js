const  sequelize  = require('sequelize');
const model = require('../models');

module.exports = {
    allProducts: async (req, res, next) => {
        try {
            console.log("Data dari req :", req.body);

            let get = await model.products.findAll({
                attributes: ["uu_id","name","price","stock","description"]
            })

            if (get.length > 0) {
                let {uu_id, name, price, stock, description } = get[0].dataValues
                return res.status(200).send({
                    success: true,
                    message:"produk bertambah",
                    uu_id: uu_id,
                    name: name,
                    price: price,
                    stock: stock,
                    description: description
                })
            } else {
                return res.status(200).send({
                    success:false,
                    message:"produk tidak bertambah",
                })
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    list: async (req, res, next) => {
        try {
            let { page, size, name, sortby, order} = req.query;
            if(!page) {
                page = 0;
            }
            if (!size) {
                size = 6;
            }

            let get = await model.products.findAndCountAll({
                offset: parseInt(page * size),
                limit: parseInt(size),
                where: { name: { [sequelize.Op.like]: `%${name}%`} },
                order: [[sortby, order ]]
            });

            res.status(200).send({
                data: get.rows,
                totalPages: Math.ceil(get.count / size),
                datanum: get.count,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
