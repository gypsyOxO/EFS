import React, { Component, Fragment } from "react"
import Wizard from "../../components/Wizard/Wizard"
import { withApollo } from "react-apollo"
import { GET_BLANK_FORM, GET_IND_EXP, GET_AMENDMENTS } from "graphql/ie/Queries"

import { graphqlFilter } from "utils/graphqlUtil"
import { filteredIEUpsert } from "graphql/ie/FilterQueries"
import { UPSERT_IND_EXP, UPSERT_IND_EXP_PAYMENT, UPSERT_IND_EXP_COMM } from "graphql/ie/Mutations"
import { defaultDisclaimers } from "views/ie/Wizard"
import {getMaxAmendment} from "./setUpAmendments"


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

			let data = {}
			//data = { IE_ID: 0 } //test new ie
            //data = { IE_ID: 6590, amend: true } //test amendment
           
		    data = { IE_ID: 6590}
			//data = { IE_ID: 6308} //test ie with no document
			if (data.IE_ID > 0) {
				initValues = await this.GetInitValuesFromDB(data)
			}

			this.setState({
				initValues: { ...initValues }
			})
		}
    }
    
    checkChecked() {
        return true
    }


	GetInitValuesFromDB = async ({ IE_ID, amend }) => {
        const { client } = this.props

		//reinitialize apollo and react init state for formik context
		await client.clearStore()
        this.setState({ initValues: {} })
               
        //if amending, needs new IE_ID to base off of. if amendment not in status 3 or no records returned, then turns into a standard edit .
        if (amend) {
            let { data: {getAmendments}} = await client.query({query: GET_AMENDMENTS, variables: {ORIG_IE_ID: IE_ID}})

            
            if (getAmendments.length) {
                const amendment = getMaxAmendment(getAmendments)
                IE_ID = amendment[0].IE_ID
                amend = amendment[0].IE_STATUS_ID === 3 ? true : false   

            }
        }
             
		let {
			data: { getIndExp }
		} = await client.query({
			query: GET_IND_EXP,
			variables: { IE_ID: IE_ID }
        })
        


		//Initalizes JSON data elements from pre-e-filing (scanned, not scanned) IEs
		getIndExp.CONTRIBUTIONS_MADE = getIndExp.CONTRIBUTIONS_MADE ? getIndExp.CONTRIBUTIONS_MADE : []
        getIndExp.CONTRIBUTIONS_RECEIVED = getIndExp.CONTRIBUTIONS_RECEIVED ? getIndExp.CONTRIBUTIONS_RECEIVED : []
        
		
		for (let index = 0; index < getIndExp.payments.length; index++) {
			getIndExp.payments[index].IE_PAYEE_VENDORS = getIndExp.payments[index].IE_PAYEE_VENDORS ? getIndExp.payments[index].IE_PAYEE_VENDORS : []
		
		}
		
		for (let index = 0; index < getIndExp.comms.length; index++) {
			getIndExp.comms[index].DISCLAIMERS = getIndExp.comms[index].DISCLAIMERS ? getIndExp.comms[index].DISCLAIMERS : defaultDisclaimers
			index++
		}

		if (amend) {
			delete getIndExp.IE_ID
			getIndExp.AMEND_NUM++
			const filteredResult = graphqlFilter(filteredIEUpsert, getIndExp)
			const {
				data: { upsertIndExp }
			} = await client.mutate({ mutation: UPSERT_IND_EXP, variables: { ie: filteredResult } })
			getIndExp.IE_ID = upsertIndExp.IE_ID
            //IE_ID is set, now handle payments and comms
            
			let index = 0
            
			for (const payment of getIndExp.payments) {
				const paymentPayload = {
					...payment,
					IE_PAYEE_VENDORS: payment.IE_PAYEE_VENDORS ? [...payment.IE_PAYEE_VENDORS] : null,
					IE_ID: getIndExp.IE_ID
				}

				const new_IE_PAYMENT_ID = await this.AmendPayments(paymentPayload)
				getIndExp.payments[index].IE_PAYMENT_ID = new_IE_PAYMENT_ID

				index++
			} 

			index = 0
			for (const comm of getIndExp.comms) {
				const commPayload = {
					...comm,
					IE_ID: getIndExp.IE_ID
				}

				const new_IE_COMM_ID = await this.AmendComms(commPayload)
				getIndExp.comms[index].IE_COMM_ID = new_IE_COMM_ID

				index++
			}
        }

		return getIndExp
	}

	AmendPayments = async paymentPayload => {

		const { client } = this.props
		delete paymentPayload.IE_PAYMENT_ID
		paymentPayload.__typename && delete paymentPayload.__typename
        const { data } = await client.mutate({ mutation: UPSERT_IND_EXP_PAYMENT, variables: { payment: paymentPayload } })
        
		return data.upsertIndExpPayment.IE_PAYMENT_ID
	}

	AmendComms = async commPayload => {

		const { client } = this.props
		delete commPayload.IE_COMM_ID
		commPayload.__typename && delete commPayload.__typename
        const { data } = await client.mutate({ mutation: UPSERT_IND_EXP_COMM, variables: { comm: commPayload } })
        
		return data.upsertIndExpComm.IE_COMM_ID
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
			initValues: { ...res }
		})
	}

	callInternalHook = async data => {
		//internal hook for external call; TODO: could be better with window ref on index.js

		const initValues = data.IE_ID ? await this.GetInitValuesFromDB(data) : await this.GetBlankForm(data)

		this.setState({
			initValues: { ...initValues }
		})
	}

	render() {
		const { initValues } = this.state

		//****only show wizard if data is loaded****
		const showWiz = Object.getOwnPropertyNames(initValues).length ? <Wizard initValues={initValues} /> : null

		return (
			<Fragment>
				{showWiz || (process.env.REACT_APP_IS_LOCAL_DEV.toLowerCase() === "true" && <button onClick={() => this.testBlankForm()}>Add new</button>)}
			</Fragment>
		)
	}
}

export default withApollo(IndExp)
