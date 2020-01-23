import React, { Component, Fragment } from "react"
import Wizard from "../../components/Wizard/Wizard"
import { withApollo } from "react-apollo"
import { GET_BLANK_FORM, GET_IND_EXP } from "graphql/ie/Queries"

import { graphqlFilter } from "utils/graphqlUtil"
import { filteredIEUpsert} from "graphql/ie/FilterQueries"
import { UPSERT_IND_EXP } from "graphql/ie/Mutations"


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
		if (process.env.NODE_ENV === "development") {
            let initValues = {}
            const { client } = this.props

			//TODO: Handle amend = true

            const data = { IE_ID: 6589}
            // const data = { IE_ID: 0}

			if (data.IE_ID > 0) {
                initValues = await this.GetInitValuesFromDB(data)
                		
			}
          

			this.setState({
                initValues: {...initValues}
                
			})
		}
	}

	GetInitValuesFromDB = async ({ IE_ID,amend }) => {
        const { client } = this.props
        
        //reinitialize state 
        await client.clearStore()
        this.setState({initValues: {}})
        
		// reads from server
		let {data: {getIndExp}} = await client.query({
			query: GET_IND_EXP,
			variables: { IE_ID: IE_ID }
		})

        
        if (amend) {
            delete getIndExp.IE_ID
            getIndExp.AMEND_NUM++
            const filteredResult = graphqlFilter(filteredIEUpsert, getIndExp) 
            const { data: {upsertIndExp}} = await client.mutate({ mutation: UPSERT_IND_EXP,variables: { ie: filteredResult } })
            getIndExp.IE_ID = upsertIndExp.IE_ID
        }
        
        

		return getIndExp
	}

	GetBlankForm = async ({ CMT_PER_ID }) => {
		const { client } = this.props
		// reads from cache
		let res = await client.readQuery({
			query: GET_BLANK_FORM
		})

		res.CMT_PER_ID = CMT_PER_ID

		return res
	}

	testBlankForm = async data => {
		const { client } = this.props
		// reads from cache
		let res = await client.readQuery({
			query: GET_BLANK_FORM
		})

        res.CMT_PER_ID = 14389
        

		this.setState({
			initValues: {...res}
		})
	}

	callInternalHook = async data => {
		//internal hook for external call; TODO: could be better with window ref on index.js

		const initValues = data.IE_ID ? await this.GetInitValuesFromDB(data) : await this.GetBlankForm(data)		


		this.setState({
			initValues: {...initValues}
		})
	}

	render() {
		const { initValues } = this.state

		//****only show wizard if data is loaded****
		const showWiz = Object.getOwnPropertyNames(initValues).length ? <Wizard initValues={initValues} /> : null

		return <Fragment>{showWiz || (process.env.REACT_APP_IS_LOCAL_DEV && <button onClick={() => this.testBlankForm()}>Add new</button>)}</Fragment>
	}
}

export default withApollo(IndExp)
