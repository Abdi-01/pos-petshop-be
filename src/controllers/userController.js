const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');


let salt = bcrypt.genSaltSync(10);

module.exports = {
    register: async (req, res, next) => {
        try {
            console.log(`req.body :`, req.body);
            let cekUser = await model.users.findAll({
                where: sequelize.or(
                    { username: req.body.username },
                    { email: req.body.email }
                )
            });

            if (cekUser.length == 0) {
                console.log(`data before hash :`, req.body);
                req.body.password = bcrypt.hashSync(req.body.password, salt)
                console.log(`data after hash :`, req.body);
                
                const uu_id = uuidv4();
                const {name, username, email, phone, password, role_id} = req.body
                

                let regis = await model.users.create({
                    uu_id, name, username, email, phone, password, role_id
                });

                return res.status(200).send({
                    success: true,
                    message: "account registered",
                    data: regis
                })

            } else {
                return res.status(400).send({
                    success: false,
                    message: "email or username exist"
                })
            }
        } catch (error) {
            next(error)
        }
    },

    getAllUser: async (req, res, next) => {
        try {
            let data = await model.users.findAll({
                attributes: ["name", "email", "phone"],
                include: [{model: model.role, attributes: ["role"]}]
            })

            return res.status(200).send(data)
            
        } catch (error) {
            next(error)
        }
    }
}