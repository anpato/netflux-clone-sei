'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      Account.hasMany(models.Profile, {
        foreignKey: 'account_id',
        onDelete: 'cascade'
      })
    }
  }
  Account.init(
    {
      tier: DataTypes.ENUM(['Premium', 'Advanced', 'Basic']),
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        field: 'user_id',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Account'
    }
  )
  return Account
}
