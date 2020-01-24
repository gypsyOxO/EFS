import GraphQLJSON from "graphql-type-json"
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date"
require('dotenv').config()

const { createWriteStream } = require("fs") // added
const path = require("path") //added

const files = []

const ROOT_PATH = process.env.ROOT_PATH
const AUDIO_PATH = process.env.AUDIO_PATH
const VIDEO_PATH = process.env.VIDEO_PATH
const DOC_PATH = process.env.DOC_PATH

export default {
	JSON: GraphQLJSON,
	Date: GraphQLDate,
	Time: GraphQLTime,
	DateTime: GraphQLDateTime,

	IndExp: {
		comms: (parent, args, context, info) => parent.getInd_exp_communications(),
		payments: (parent, args, context, info) => parent.getInd_exp_payments()
	},

	Mutation: {
		uploadFile: async (_, { file, meta }) => {
			let filePath = ""
			switch (meta.FILE_TYPE) {
				case "AUDIO":
					filePath = filePath + AUDIO_PATH
					break
				case "VIDEO":
					filePath = filePath + VIDEO_PATH
					break
				default:
					filePath = filePath + DOC_PATH
					break
			}

			const { createReadStream, filename } = await file
			await new Promise(res =>
				createReadStream()
					.pipe(createWriteStream(path.join(ROOT_PATH, filePath, meta.MODIFIED_FILE_NAME)))
					.on("close", res)
			)

			files.push(filename)

			return true
		},

		updateIndExp: async (parent, args, { db }) => {		
			await db.ind_exp.update(args.ie, { where: { IE_ID: args.IE_ID } })
			return db.ind_exp.findByPk(args.IE_ID)
		},

		addIndExp: (parent, args, { db }) => {
			return db.ind_exp.create(args.ie)
        },
        
        upsertIndExp: async (_,args, {db}) => {
            if (typeof args.ie.IE_ID !== "undefined") {
                await db.ind_exp.update(args.ie, { where: { IE_ID: args.ie.IE_ID } })

				return db.ind_exp.findByPk(args.ie.IE_ID)
			} else {
				return db.ind_exp.create(args.ie)
			}                
        },

		upsertIndExpPayment: async (parent, args, { db }) => {
			if (typeof args.payment.IE_PAYMENT_ID !== "undefined") {
				await db.ind_exp_payment.update(args.payment, { where: { IE_PAYMENT_ID: args.payment.IE_PAYMENT_ID } })

				return db.ind_exp_payment.findByPk(args.payment.IE_PAYMENT_ID)
			} else {
				return db.ind_exp_payment.create(args.payment)
			}
		},

		deleteIndExpPayment: (_, { IE_PAYMENT_ID }, { db }) => {
            //returns number of deleted rows
            return db.ind_exp_payment.destroy({ where: { IE_PAYMENT_ID: IE_PAYMENT_ID } })            
		},

		upsertIndExpComm: async (parent, args, { db }) => {
			if (typeof args.comm.IE_COMM_ID !== "undefined") {
				await db.ind_exp_communication.update(args.comm, { where: { IE_COMM_ID: args.comm.IE_COMM_ID } })

				return db.ind_exp_communication.findByPk(args.comm.IE_COMM_ID)
			} else {
				return db.ind_exp_communication.create(args.comm)
			}
        },

        deleteIndExpComm: (_,{IE_COMM_ID}, {db}) => {
            //returns number of deleted rows
            return db.ind_exp_communication.destroy({where: {IE_COMM_ID: IE_COMM_ID}})
            
        }

	},

	Query: {
		getFiles: () => files,
		getIndExpPayment: (parent, { IE_PAYMENT_ID }, { db }) => db.payment.findByPk(IE_PAYMENT_ID),
		getCandidates: (parent, args, { db }) => db.candidate.findAll(),
		getBallotmeasures: (parent, args, { db }) => db.ballotmeasures.findAll(),
		getCommtypes: (parent, args, { db }) => db.comm_type.findAll({ where: { ACTIVE_FLG: 1 } }),
		getIndExp: (parent, { IE_ID }, { db }) => db.ind_exp.findByPk(IE_ID),
		getCommittees: (parent, args, { db }) => db.committee.findAll()
	}
}

//FOR REFERENCE ONLY

// getIndExps: (parent, args, { db }) => {
//     const Op = db.Sequelize.Op
//     if (!args.limit) return db.ind_exp.findAll()

//     return db.ind_exp.findAll({
//         where: {
//             IE_ID: {
//                 [Op.gt]: 641,
//                 [Op.lt]: 645
//             }
//         }
//     })
// }
