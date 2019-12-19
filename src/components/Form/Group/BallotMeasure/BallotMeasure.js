import React, { Component } from "react"

//import Select, { MultiSelect } from "../../../UI/Form/Select/Select"

import { Field } from "formik"
import { renderReactSelectField } from "components/Form/Inputs/renderInputs"

//import axios from '../../../axios-api'
import { optGroupBuilder, getDistinctOptions } from "../../../../utils/selectUtil"
//import gql from "graphql-tag"
//import { Query } from "react-apollo"

import Grid from "@material-ui/core/Grid"
import { GET_BALLOTMEASURES } from "graphql/ie/Queries"
import { withApollo } from "react-apollo"

// const GET_BALLOTMEASURES = gql`
// query {
//     getBallotmeasures {
//       BM_ID
//       BM_NUM_OR_LETTER
//       BM_NAME
//       BM_FULL_NAME
//       BM_GROUP_LABEL
// 	  ELECTION_ID
// 	  ELECTION_DESC
// 	  JURIS_ID
//     }
//   }
// `

// const BallotMeasureQuery = () => {
// 	return (
// 		<Query query={GET_BALLOTMEASURES}>
// 			{({ loading, error, data, client }) => {
// 				if (loading) {
// 					return <div>Loading...</div>
// 				}
// 				if (error) {
// 					console.error(error)
// 					return <div>Error!</div>
// 				}
// 				return (
// 					<BallotMeasure client={client} ballotmeasures={data.getBallotmeasures} />
// 				)
// 			}}
// 		</Query>
// 	)
// }

class BallotMeasure extends Component {
	state = {
		data: [],
		Elections: [],
		Ballotmeasures: [],
		isLoading: false
	}

	componentDidMount = async () => {
		
		const { client } = this.props
        const {data: {getBallotmeasures}} = await client.query({ query: GET_BALLOTMEASURES })

		this.setState({ data: getBallotmeasures, isLoading: false }, () => {
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

	SelectHandler = (_, value) => {
        //defaults as election_id
        this.props.setFieldValue("ELEC_SEAT_ID", null)
        this.getListOfBallotmeasures(value)
    }


	render() {
		const { Elections, Ballotmeasures, isLoading } = this.state

        return (
			<Grid container>
				<Grid item xs={12} style={{ marginBottom: 4 }}>
					<Field
                        name="ELECTION_ID"
                        SelectHandler={(_, value) => this.SelectHandler(_, value)}                      	
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

						placeholder="Select Ballot Measure..."
						options={Ballotmeasures}
                        isLoading={isLoading}
                        component={renderReactSelectField}
					/>
				</Grid>
			</Grid>
		)
	}
}



export default withApollo(BallotMeasure)

