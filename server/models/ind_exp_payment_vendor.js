/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	const vendor = sequelize.define(
		"vendor",
		{
			IE_PAYMENT_VENDOR_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			IE_PAYMENT_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				references: {
					model: "ind_exp_payment",
					key: "ie_payment_id"
				}
			},
			IE_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				references: {
					model: "ind_exp",
					key: "IE_ID"
				}
			},
			IE_PAYMENT_VENDOR_LNAME: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYMENT_VENDOR_FNAME: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYMENT_VENDOR_ADDR_STR: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYMENT_VENDOR_ADDR_STR2: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYMENT_VENDOR_ADDR_CITY: {
				type: DataTypes.STRING(255),
				allowNull: true
			},
			IE_PAYMENT_VENDOR_ADDR_ST: {
				type: DataTypes.CHAR(2),
				allowNull: true
			},
			IE_PAYMENT_VENDOR_ADDR_ZIP_5: {
				type: DataTypes.CHAR(5),
				allowNull: true
			},
			IE_PAYMENT_VENDOR_ADDR_ZIP_4: {
				type: DataTypes.CHAR(4),
				allowNull: true
			}
		},
		{
			tableName: "ind_exp_payment_vendor"
		}
	)

	vendor.associate = models => {
		vendor.belongsTo(models.payment, { foreignKey: "IE_PAYMENT_ID" })
	}
	return vendor
}
