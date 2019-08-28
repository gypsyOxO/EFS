/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidates', {
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
    },
    GEN_ELECTION_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CAND_PER_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: '0'
    },
    PER_PREFIX: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PER_FNAME: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    PER_MID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PER_LNAME: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    PER_SUFFIX: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ELEC_SEAT_CAND_ID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    ELEC_SEAT_ID: {
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
    },
    WINNER_FLG: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    PRI_WINNER_FLG: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    GEN_WINNER_FLG: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    OFC_DESC: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DIST_NUM: {
      type: DataTypes.INTEGER(3),
      allowNull: true
    },
    OFFICE_TYP: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    OFC_CD: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    DISP_ORDER: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '999'
    },
    ELEC_SEAT_LABEL: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'candidates'
  });
};
