/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	const ind_exp = sequelize.define(
		"ind_exp",
		{
			IE_ID: {
				type: DataTypes.INTEGER(10),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			ELECTION_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
				references: {
					model: "election",
					key: "ELECTION_ID"
				}
			},
			ELEC_SEAT_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
				references: {
					model: "elec_seat",
					key: "ELEC_SEAT_ID"
				}
			},
			ELEC_SEAT_CAND_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
				references: {
					model: "elec_seat_candidate",
					key: "ELEC_SEAT_CAND_ID"
				}
			},
			CAND_PER_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
				references: {
					model: "per_candidate",
					key: "CAND_PER_ID"
				}
			},
			PRIMARY_GENERAL_FLG: {
				type: DataTypes.CHAR(1),
				allowNull: true
			},
			BM_ID: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
				references: {
					model: "ballot_measure",
					key: "BM_ID"
				}
			},
			MC_FLG: {
				type: DataTypes.INTEGER(10),
				allowNull: false,
				defaultValue: "0"
			},
			CEC_NOTIFY_DATE: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			IE_AMT: {
				type: DataTypes.DECIMAL,
				allowNull: true
			},
			SUPPORT_OPPOSE_FLG: {
				type: DataTypes.CHAR(1),
				allowNull: true
			},
			PER_IE_FILER_ID: {
				type: DataTypes.INTEGER(10),
				allowNull: true,
				references: {
					model: "person",
					key: "PER_ID"
				}
			},
			CMT_PER_ID: {
				type: DataTypes.INTEGER(10),
				allowNull: true
			},
			IE_ACTIVE_FLG: {
				type: DataTypes.INTEGER(1).UNSIGNED.ZEROFILL,
				allowNull: true,
				defaultValue: "1"
			},
			ORIG_IE_ID: {
				type: DataTypes.INTEGER(10),
				allowNull: true
			},
			AMEND_NUM: {
				type: DataTypes.INTEGER(5),
				allowNull: true,
				defaultValue: "0"
			},			
			DATE_DISTRIBUTED: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			NUM_DISTRIBUTED: {
				type: DataTypes.INTEGER(11),
				allowNull: true
            },
            CONTRIBUTIONS_MADE: {
                type: DataTypes.JSON,
				allowNull: true
            },
            CONTRIBUTIONS_RECEIVED: {
                type: DataTypes.JSON,
				allowNull: true
            },
            REP_CONT_MADE: {
                type: DataTypes.CHAR(1),
                allowNull: true
            },
            REP_CONT_RECEIVED: {
                type: DataTypes.CHAR(1),
                allowNull: true
            },
            SUBJECT: {
                type: DataTypes.VIRTUAL,
                get: function() {                    
                    if(this.get('BM_ID')) {
                        return "B"
                    } else if(this.get('ELEC_SEAT_ID') || this.get('ELEC_SEAT_CAND_ID')) {
                        return "C"
                    } else {
                        return ""
                    }

                }
            }
		},
		{
			tableName: "ind_exp"
		}
	)

	ind_exp.associate = models => {
        ind_exp.hasMany(models.ind_exp_communication, { foreignKey: "IE_ID" }),
        ind_exp.hasMany(models.ind_exp_payment, { foreignKey: "IE_ID" })
	}

	return ind_exp
}
