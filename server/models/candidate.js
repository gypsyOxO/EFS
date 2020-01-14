/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidate', {
    ELECTION_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    ELECTION_DESC: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CAND_PER_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: '0'
    },
    PER_FNAME: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    PER_LNAME: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ELEC_SEAT_CAND_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0',
      primaryKey: true
    },
    ELEC_SEAT_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },    
    ELEC_SEAT_LABEL: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    JURIS_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    PRIMARY_FLG: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    GENERAL_FLG: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    }   
  }, {
    tableName: 'candidates'
  });
};
