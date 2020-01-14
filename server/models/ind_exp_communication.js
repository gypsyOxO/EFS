/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	const ind_exp_communication = sequelize.define(
		"ind_exp_communication",
		{
			IE_COMM_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			IE_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				references: {
					model: "ind_exp",
					key: "IE_ID"
				}
			},
			FILE_NAME: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			COMM_TYPE: {
				type: DataTypes.STRING(10),
				allowNull: false,
				references: {
					model: "communication_type",
					key: "COMM_TYPE"
				}
			},
			IE_COMM_NUM: {
				type: DataTypes.INTEGER(11),
				allowNull: true
			},
			DOC_FILE_NAME: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			AUDIO_FILE_NAME: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			VIDEO_FILE_NAME: {
				type: DataTypes.STRING(255),
				allowNull: true
            },
            DISCLAIMERS: {
                type: DataTypes.JSON,
				allowNull: true
            }
		},
		{
			tableName: "ind_exp_communication"
		}
	)

	ind_exp_communication.associate = models => {
		ind_exp_communication.belongsTo(models.ind_exp, { foreignKey: "IE_ID" })
	}
	return ind_exp_communication
}
