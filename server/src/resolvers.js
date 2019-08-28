

export default {    

    // IndExp: {
    //     indexpcomms(parent,args,ctx,info) {
    //         console.log(indexpcomms)
    //         indexpcomms.filter(indexp => indexp.ie_id === parent.id)
            
    //     }
    // },
    IndExp: {
        indexpcomms: (parent, args, context, info) => parent.getInd_exp_communications(),
    },

	Query: {
		candidates: (parent, args, { db }) => db.candidate.findAll(),
        indexp: (parent,{IE_ID},{db}) => db.ind_exp.findByPk(IE_ID),
        indexps: (parent, args, { db }) => {

            const Op = db.Sequelize.Op
            if (!args.limit) return db.ind_exp.findAll()
            
            return db.ind_exp.findAll({
                where: {                    
                    IE_ID: {
                        [Op.gt] : 641,
                        [Op.lt] : 645
                    }
                }
            })
        }
    }
}
