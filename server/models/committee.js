/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('committee', {    
      CMT_PER_ID: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true
      },

    CMT_STATE_ID: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    officeSought: {
        type: DataTypes.STRING(100),
        allowNull: true
      },

    candidateorCommitteeName: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
  }, {
    tableName: 'active_committee'
  });
};
