/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	const communication = sequelize.define(
		"communication",
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
			file_name: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
			COMM_TYPE: {
				type: DataTypes.STRING(10),
				allowNull: false,
				references: {
					model: "communication_type",
					key: "COMM_TYPE"
				}
			},
			ie_comm_num: {
				type: DataTypes.INTEGER(11),
				allowNull: true
			},
			date_distributed: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			num_distributed: {
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
			}
		},
		{
			tableName: "ind_exp_communication"
		}
	)

	communication.associate = models => {
		communication.belongsTo(models.ind_exp, { foreignKey: "IE_ID" })
	}
	return communication
}
