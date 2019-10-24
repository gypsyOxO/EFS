/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	const payment = sequelize.define(
		"payment",
		{
			IE_PAYMENT_ID: {
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
                },
                onUpdate: "cascade"
			},
			IE_PAYEE: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYMENT_DESC: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYMENT_DATE: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			IE_PAYMENT_AMT: {
				type: "DOUBLE",
				allowNull: true
			},
			IE_PAYEE_LNAME: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYEE_FNAME: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYEE_ADDR_STR: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYEE_ADDR_STR2: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYEE_ADDR_CITY: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYEE_ADDR_ST: {
				type: DataTypes.CHAR(2),
				allowNull: true
			},
			IE_PAYEE_ADDR_ZIP_5: {
				type: DataTypes.CHAR(5),
				allowNull: true
			},
			IE_PAYEE_ADDR_ZIP_4: {
				type: DataTypes.CHAR(4),
				allowNull: true
			}
		},
		{
			tableName: "ind_exp_payment"
		}
	)

	payment.associate = models => {
        payment.belongsTo(models.ind_exp, { foreignKey: "IE_ID" }),
        payment.hasMany(models.vendor, { foreignKey: "IE_PAYMENT_ID" })
	}
	return payment
}
