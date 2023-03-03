'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });

  transaction.associate = (models) => {
    transaction.hasMany(models.order, {foreignKey: "transaction_id"}),
    transaction.belongsTo(models.users, {foreignKey: "user_id"})
  }

  return transaction;
};