"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      link.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  link.init(
    {
      idUser: DataTypes.INTEGER,
      linkImage: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      uniqueLink: DataTypes.STRING,
      viewCount: DataTypes.INTEGER,
      links: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "link",
    }
  );
  return link;
};
