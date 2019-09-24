

export default {    

    IndExp: {
        indexpcomms: (parent, args, context, info) => parent.getInd_exp_communications(),
    },

    T1: {
        comms: (parent, args, context, info) => parent.getT1s1s(),
    },

    Mutation: {
        createTest: (parent,args,{db}) => db.ind_exp.create(args),
        createUser: (parent,args,{db}) => {



            //console.log(Object.values(db.users.associations.addresses))
            return db.users.create(args,
             {
                 include: [db.users.associations.addresses]
             }
        )},


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

        createIE: (parent,args, {db}) => {
//console.log(Object.values(db.t1.associations.t1s1s))
          
            //console.log(Object.values(db.t1.associations.t1s1s))
             return db.ind_exp.create(args.ie
            //     , {
            //     include: [db..associations.t1s1s]
            // }
            )}
            //db.t1.create(args.indexp)
        
    },

	Query: {
        candidates: (parent, args, { db }) => db.candidate.findAll(),
        ballotmeasures: (parent, args, { db }) => db.ballotmeasures.findAll(),
        indexp: (parent,{IE_ID},{db}) => db.ind_exp.findByPk(IE_ID),
        t1: (parent,{IE_ID},{db}) => db.t1.findByPk(IE_ID),
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
