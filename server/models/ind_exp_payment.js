/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	const ind_exp_payment = sequelize.define(
		"ind_exp_payment",
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
            },
			IE_PAYEE_VENDORS: {
				type: DataTypes.JSON,
				allowNull: true
			},            
		},
		{
			tableName: "ind_exp_payment"
		}
	)

	ind_exp_payment.associate = models => {
        ind_exp_payment.belongsTo(models.ind_exp, { foreignKey: "IE_ID" })        
	}
	return ind_exp_payment
}
