import React, { Component } from "react"

import { Field } from "formik"
import { renderReactSelectField } from "components/Form/Inputs/renderInputs"

import { optGroupBuilder, getDistinctOptions } from "../../../../utils/selectUtil"

import Grid from "@material-ui/core/Grid"
import { GET_BALLOTMEASURES } from "graphql/ie/Queries"
import { withApollo } from "react-apollo"


class BallotMeasure extends Component {
	state = {
		data: [],
		Elections: [],
		Ballotmeasures: []
	}

	componentDidMount = async () => {
		
		const { client } = this.props
        const {data: {getBallotmeasures}} = await client.query({ query: GET_BALLOTMEASURES })

		this.setState({ data: getBallotmeasures}, () => {
			this.initControls()
		})
	}


	//handle initial default selections here....get incoming props and set select option states.
	initControls = () => {
    
        const listOfElections = getDistinctOptions(this.state.data, "ELECTION_ID", "ELECTION_DESC")

		const election_id = this.props.values.ELECTION_ID || listOfElections[0].value

		this.setState({ Elections: listOfElections })
		this.getListOfBallotmeasures(election_id)
	}

	getListOfBallotmeasures = election_id => {
		election_id = election_id || this.props.values.ELECTION_ID

		let electionBMList = []
		electionBMList =			
				this.state.data.filter(el => el.ELECTION_ID === election_id)
				

		const bm_list = optGroupBuilder(electionBMList, "", "BM_FULL_NAME", "BM_ID", "BM_GROUP_LABEL")

		this.setState({ Ballotmeasures: bm_list })
	}


    handlePrimaryGeneralFlg = BM_ID => {
		const { ELECTION_ID } = this.props.values
		let filterList = {}

		if (ELECTION_ID && BM_ID) {
			filterList = this.state.data.find(
				el => el.ELECTION_ID === ELECTION_ID && el.BM_ID === BM_ID
            )
            
             this.props.setFieldValue("PRIMARY_GENERAL_FLG", filterList.PRIMARY_GENERAL_FLG)
        } 
    }

	SelectHandler = (type, value) => {
        //defaults as election_id
        if (type === "ELECTION_ID") {
            this.props.setFieldValue("BM_ID", null)
            this.getListOfBallotmeasures(value)
        } else if (type === "BM_ID") {            
            this.handlePrimaryGeneralFlg(value)            
        }
    }


	render() {
        const { Elections, Ballotmeasures, isLoading } = this.state
        const {values: {ELECTION_ID}} = this.props

        return (
			<Grid container>
				<Grid item xs={12} style={{ marginBottom: 4 }}>
					<Field
                        name="ELECTION_ID"
                        SelectHandler={(type, value) => this.SelectHandler(type, value)}                      	
                        placeholder="Select Election..."	
                        options={Elections}                        
                        isLoading={isLoading}
                        component={renderReactSelectField}
					/>
				</Grid>
				<Grid item xs={12} style={{ marginBottom: 4 }}>
					<Field
                        name="BM_ID"
                        multiLevelOptions
                        SelectHandler={(type, value) => this.SelectHandler(type, value)}                      	
						placeholder="Select Ballot Measure..."
						options={Ballotmeasures}
                        isLoading={isLoading}
                        disabled={!ELECTION_ID}
                        component={renderReactSelectField}
					/>
				</Grid>
			</Grid>
		)
	}
}



export default withApollo(BallotMeasure)

