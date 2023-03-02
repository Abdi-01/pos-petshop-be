const model = require('../models');
const { createToken } = require('../helper/jwt');
const { users, sequelize } = require('../models');

module.exports = {
    login: async (req, res, next) => {
        try {
            console.log("Data dari req :", req.body);

            let get = await model.users.findAll({
                attributes: ["uu_id","role_id","username"],
                where: ({ username: req.body.username },
                        {password: req.body.password})
            });

            if (get.length > 0) {
                // console.log("ini dari get:", get[0].dataValues);
                // get[0].dataValues.role_id = get[0].dataValues.role_id.role_id
                // console.log(role_id);
                
                let{uu_id, username, email, role_id } = get[0].dataValues
                let token = createToken({uu_id, email});
                return res.status(200).send({
                    success: true,
                    message:"login success",
                    // data: username, token, role
                    username : username,
                    role_id: role_id,
                    token: token

                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: "account or password salah"
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
            
        }
    },
    keepLogin: async (req, res, next) => {
        try {
            console.log("Decript token :", req.decript);
            let get = await model.users.findAll({
                attributes: ["uu_id","role_id","username"],
                where: ({ uu_id:req.decript.uu_id })
            });
            // get [0].dataValues.role_id = get[0].dataValues.role_id.role_id;
            let{uu_id, username, email, role_id } = get[0].dataValues;
            let token = createToken({uu_id, email});
            return res.status(200).send({ 
                success: true,
                username: username,
                role_id: role_id,
                token: token
            })
        } catch (error) {
            console.log(error);
            next(error); 
        }
    }
}