import React, { Component, Fragment } from "react"
import Wizard from "../../components/Wizard/Wizard"
import { withApollo } from "react-apollo"
import {GET_BLANK_FORM, GET_IND_EXP} from "graphql/ie/Queries"


class IndExp extends Component {
	constructor() {
		super()
        window.IndExp = this //allows for external app call to internal hook.          
	}

    state = {
        initValues: {}
    }

	// componentDidMount = async () => {
    //     //*****for testing purposes only*****
	// 	let initValues = {}

    //     //TODO: Handle amend = true

    //     const data = {IE_ID: 6448}      

	// 	if (data.IE_ID > 0) {
            
    //         initValues = await this.GetInitValuesFromDB(data)

    //         data.amend && delete initValues.IE_ID && initValues.AMEND_NUM++
            
    
	// 	} 

    //     this.setState({
    //         initValues: { ...this.state.initValues, ...initValues }
    //     })

    // }
    

	GetInitValuesFromDB = async ({IE_ID}) => {
		const {client} = this.props
        // reads from server
		let res = await client.query({
			query: GET_IND_EXP,
			variables: { IE_ID: IE_ID }
        })
        
        return res.data.getIndExp
    }
    
    GetBlankForm = async ({CMT_PER_ID}) => {
        const {client} = this.props
        // reads from cache
        let res = await client.readQuery({
            query: GET_BLANK_FORM
        })

        res.CMT_PER_ID = CMT_PER_ID

        return res

    }

    testBlankForm = async data => {
        const {client} = this.props
        // reads from cache
        let res = await client.readQuery({
            query: GET_BLANK_FORM
        })

        res.CMT_PER_ID = 14389
        
        this.setState({
			initValues: { ...this.state.initValues, ...res }
		})
        
    }



	callInternalHook = async data => {
        //internal hook for external call; TODO: could be better with window ref on index.js
   
        const initValues = data.IE_ID > 0 ? await this.GetInitValuesFromDB(data) : await this.GetBlankForm(data)

        data.amend && delete initValues.IE_ID && initValues.AMEND_NUM++
        
		this.setState({
			initValues: { ...this.state.initValues, ...initValues }
		})
	}

	render() {
        
        const { initValues } = this.state 
        
        //****only show wizard if data is loaded****     
        const showWiz = Object.getOwnPropertyNames(initValues).length ? <Wizard initValues={initValues}/> : null
		   
		return (
			<Fragment>                		                
				{showWiz || <button onClick={() => this.testBlankForm()}>Add new</button>}			 
                
			</Fragment>
		)
	}
}

export default withApollo(IndExp)
