import React, { Component, Fragment } from "react"
import Wizard from "../../components/Wizard/Wizard"
import { withApollo } from "react-apollo"
import {GET_BLANK_FORM, GET_IND_EXP} from "../../graphql/ie/Queries"


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

    //     const data = {IE_ID: 6443}

	// 	if (data.IE_ID > 0) {
	// 		initValues = await this.GetInitValuesFromDB(data)			
	// 	} else {
	// 		initValues = await this.GetBlankForm()
	// 	}

	// 	this.setState({
	// 		initValues: { ...this.state.initValues, ...initValues }
	// 	})

    // }
    

	GetInitValuesFromDB = data => {
		const {client} = this.props

		let res = client.query({
			query: GET_IND_EXP,
			variables: { IE_ID: data.IE_ID }
        }).then(result => result.data.indexp)

        return res
    }
    
    GetBlankForm = () => {
        const {client} = this.props

        let res = client.query({
            query: GET_BLANK_FORM
        }).then(result => result.data)        
        return res        
    }

	callInternalHook = async data => {
		//internal hook for external call; TODO: could be better with window ref on index.js

		const initValues = data.IE_ID > 0 ? await this.GetInitValuesFromDB(data) : await this.GetBlankForm()		

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
				{showWiz}			
			</Fragment>
		)
	}
}

export default withApollo(IndExp)
