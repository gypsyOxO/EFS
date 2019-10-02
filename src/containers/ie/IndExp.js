import React, {Component, Fragment} from "react"
import Wizard from "../../components/Wizard/Wizard"

import {withApollo} from "react-apollo"
import { loader } from "graphql.macro"
const GET_IND_EXP = loader("../../graphql/ie/getIE.graphql")


const blankForm = {   //values for a blank form
    IE_ID: 0,
    SUBJECT: "B",
    ELECTION_ID: 53,
    BM_ID: 72,
    MC_FLG: "1",
    SUPPORT_OPPOSE_FLG: "O",
    CMT_PER_ID: 14389
}


class IndExp extends Component {
    constructor() {
        super()
        window.IndExp = this  //allows for external app call to internal hook.           
    }

    state = {
        initValues: {...blankForm}
    }
    

    GetInitValues = (data) => {
        const {client} = this.props        

        let res = client.query({ query: GET_IND_EXP,
        variables: {IE_ID: data.IE_ID}
        })         
        return res
    }


    callInternalHook = async (data) => {   //internal hook for external call; could be better with window ref on index.js
        
        let initValues = {}
        
        if (data.IE_ID > 0) {
            initValues = await this.GetInitValues(data) 
            initValues = initValues.data.indexp
        } else {
            initValues = blankForm
        }
        //console.log(initValues)
        //console.log("yes", initValues )
        //data.IE_ID ? initValues = GetInitValues() : initValues = blankForm   //if IE_ID > 0, call gql and set initvalues, else set to blank form
        //console.log(initValues)
        this.setState({initValues: {...this.state.initValues, ...initValues}})        


    }

    render() {
        const {initValues} = this.state
        //console.log(initValues)

        return (
            <Fragment>
                {/* <GetInitValues /> */}
                <Wizard initValues={initValues}/>
                {/* <Wizard /> */}
            </Fragment>
        )
    }

}


export default withApollo(IndExp)