const models = require('./models');
const ind_exp = models.ind_exp;
const ind_exp_communication= models.ind_exp_communication;

// ind_exp.findByPk(3).then((foundUser) => {
//     console.log('yar')
//     console.log(foundUser)
// }).catch((err) => {
//     console.log("Error while find user : ", err)
//   })


  ind_exp.findByPk(642, {include: [ind_exp_communication]}).then((foundUser) => {
    console.log(foundUser.dataValues.ind_exp_communications[0].dataValues)
}).catch((err) => {
    console.log("Error while find user : ", err)
  })

