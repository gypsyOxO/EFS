/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ballotmeasures', {
    BM_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: '0', 
      primaryKey:true
    },
    BM_NUM_OR_LETTER: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    BM_NAME: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    BM_FULL_NAME: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    BM_GROUP_LABEL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ELECTION_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    ELECTION_DESC: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ELECTION_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'ballotmeasures'
  });
};
