/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const comm_type = sequelize.define('comm_type', {
    COMM_TYPE: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    COMM_TYPE_DESC: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    DISP_ORDER: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    COMM_FILE_TYPE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    DOC_FILE_TYPES: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    AUDIO_FILE_TYPES: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    VIDEO_FILE_TYPES: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ACTIVE_FLG: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    CC_FLG: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: '1'
    },
    IE_FLG: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'communication_type'
  });

  return comm_type
};
