const { createWriteStream } = require("fs") // added
const path = require("path") //added
const files = []

export default {
	IndExp: {
		indexpcomms: (parent, args, context, info) =>
			parent.getInd_exp_communications(),
		payments: (parent, args, context, info) => {
			//console.log(parent)
			return parent.getPayments()
		}
	},
	Payment: {
		vendors: (parent, args, context, info) => {
			//console.log(parent)
			return parent.getVendors()
		}
	},

	Mutation: {
		uploadFile: async (_, { file }) => {
            const { createReadStream, filename } = await file
            
            //determine if file exists, rename if it does
            console.log(filename)    
			await new Promise(res =>
				createReadStream()
					.pipe(
						createWriteStream(
							path.join(__dirname, "../test", filename)
						)
					)
					.on("close", res)
            )
            
			//files[0] = filename
			files.push(filename)

			return true
		},

		updateIE: (parent, args, { db }) => {
            console.log(args.ie)
			return db.ind_exp
				.update(args.ie, {
					include: [db.ind_exp.associations.payments],
					returning: true,
					where: { IE_ID: args.ie.IE_ID }
				})
				.then(ind_exp => {
                    console.log(args.ie)
					// console.log(args.ie.payments)
					// args.ie.payments.map(p => {
					//     db.payment.upsert(args.ie.payment, {returning: true, where: {IE_PAYMENT_ID: args.ie.payment[p].IE_PAYMENT_ID}})
					// })

					return args.ie.IE_ID
				})
		},
		createIE: (parent, args, { db }) => {
            console.log(args.ie)
			return db.ind_exp.create(
				args.ie
				//     , {
				//     include: [db..associations.t1s1s]
				// }
			)
		}
		//db.t1.create(args.indexp)
	},

	Query: {
		files: () => files,
		candidates: (parent, args, { db }) => db.candidate.findAll(),
        ballotmeasures: (parent, args, { db }) => db.ballotmeasures.findAll(),
        commtypes: (parent, args, { db }) => db.comm_type.findAll({where: {ACTIVE_FLG: 1}}),
		indexp: (parent, { IE_ID }, { db }) => db.ind_exp.findByPk(IE_ID),
		indexps: (parent, args, { db }) => {
			const Op = db.Sequelize.Op
			if (!args.limit) return db.ind_exp.findAll()

			return db.ind_exp.findAll({
				where: {
					IE_ID: {
						[Op.gt]: 641,
						[Op.lt]: 645
					}
				}
			})
		}
	}
}

//      createTest: (parent,args,{db}) => db.ind_exp.create(args),
// createUser: (parent,args,{db}) => {

//     return db.users.create(args,
//      {

//          include: [db.users.associations.addresses]
//      }
// )},

//     return db.users.create({
//         firstname: "Jummy",
//          addresses: [
//              {type: "yo gouy"}
//          ]
//     },
//      {
//          include: [db.users.associations.addresses]
//      }
// )},
