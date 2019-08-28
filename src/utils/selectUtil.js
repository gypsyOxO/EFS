
//Creates options and optgroups from array of objects and gets rendered in the select-react v2 library format listed below
// const options = [
//     {
//       label: "Group 1",
//       options: [
//         { label: "Group 1, option 1", value: "value_1_1" },
//         { label: "Group 1, option 2", value: "value_1_2" }
//       ]
//     },
//     {
//       label: "Group 2",
//       options: [
//         { label: "Group 2, option 1", value: "value_2_1" },
//         { label: "Group 2, option 2", value: "value_2_2" }
//       ]
//     },
//   ];
// e.g. optvalue=CAND_PER_ID, optgroup=ELEC_SEAT_LABEL  

export function optGroupBuilder(list,fname,lname,optvalue,optgroup) {
    //e.g. optvalue = cand_per_id
    let optList = []
    
    for (let el of list) {         
        let fullName = el[fname] === '' ? el[lname] : el[fname] + ' ' + el[lname]
        let obj = optList.findIndex(o => o.label === el[optgroup])
        if (obj === -1) {
            optList.push({label: el[optgroup], options: [{label: fullName, value: el[optvalue] }]})            
        } else {
            optList[obj].options.push({label: fullName, value: el[optvalue] })
        }
    } 
    
    return optList   
}

// Creates unique set of options from object of arrays in the format below
// const options = [{label: "option 1", value: "value_1"},
//                  {label: "option 2", value: "value_2"},
//                  {label: "option 3", value: "value_3"}]
// e.g. value=ELEC_SEAT_ID, label=ELEC_SEAT_LABEL

export function getDistinctOptions(list,value,label) {
    const distinctList = [...new Set(list.map(el => el[value]))]
    .map(o => {
        return {
            value: o,
            label: list.find(el => el[value] === o)[label]
        }
    })
    return distinctList
}

//Simulates lodash pick with es6 equivalent
export function pick (obj, keys) {
  Object.keys(obj)
    .filter(i => keys.includes(i))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {})
}
