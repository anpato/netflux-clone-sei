'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.Account, {
        foreignKey: 'account_id',
        onDelete: 'cascade'
      })
    }
  }
  Profile.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'account_id',
        references: {
          model: 'Accounts',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Profile'
    }
  )
  return Profile
}
