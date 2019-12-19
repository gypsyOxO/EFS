import React, { Component, Fragment } from "react"
import Wizard from "../../components/Wizard/Wizard"
import { withApollo } from "react-apollo"
import {GET_BLANK_FORM, GET_IND_EXP} from "graphql/ie/Queries"
import {ADD_IND_EXP} from "graphql/ie/Mutations"


class IndExp extends Component {
	constructor() {
		super()
        window.IndExp = this //allows for external app call to internal hook.          
	}

    state = {
        initValues: {}
    }

	componentDidMount = async () => {
        //*****for testing purposes only*****
		let initValues = {}

        const data = {IE_ID: 6448}      

		if (data.IE_ID > 0) {
            
            initValues = await this.GetInitValuesFromDB(data)
            
    
		} else { 
            
            //initValues = await this.GetBlankForm()
    
        }

        this.setState({
            initValues: { ...this.state.initValues, ...initValues }
        })

    }
    

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
        let defaults = await client.readQuery({
            query: GET_BLANK_FORM
        })

        defaults.CMT_PER_ID = CMT_PER_ID
                
        const res = await client.mutate({
            mutation: ADD_IND_EXP,
            variables: {ie: defaults}
        }) 
        
        //default candidate or ballotmeasure
        res.data.addIndExp.SUBJECT = "C"

        return res.data.addIndExp

    }

    testBlankForm = async data => {
        const {client} = this.props
        // reads from cache
        let defaults = await client.readQuery({
            query: GET_BLANK_FORM
        })
                
        defaults.CMT_PER_ID = data

        const res = await client.mutate({
            mutation: ADD_IND_EXP,
            variables: {ie: defaults}
        }) 

        //default candidate or ballotmeasure
        res.data.addIndExp.SUBJECT = "C"
        
        this.setState({
			initValues: { ...this.state.initValues, ...res.data.addIndExp }
		})
        
    }



	callInternalHook = async data => {
        //internal hook for external call; TODO: could be better with window ref on index.js
        
        

        const initValues = data.IE_ID > 0 ? await this.GetInitValuesFromDB(data) : await this.GetBlankForm(data)
        
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
				{showWiz || <button onClick={() => this.testBlankForm(14389)}>Add new</button>}			 
                
			</Fragment>
		)
	}
}

export default withApollo(IndExp)
