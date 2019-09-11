import React, { Component, Fragment } from "react"
import Select, { MultiSelect } from "../../../UI/Form/Select/Select"
//import axios from '../../../axios-api'
import {
	optGroupBuilder,
	getDistinctOptions
} from "../../../../utils/selectUtil"
import gql from "graphql-tag"
import { Query } from "react-apollo"

import Grid from "@material-ui/core/Grid"

const GET_BALLOTMEASURES = gql`
query {
    ballotmeasures {
      BM_ID
      BM_NUM_OR_LETTER
      BM_NAME
      BM_FULL_NAME
      BM_GROUP_LABEL
	  ELECTION_ID
	  ELECTION_DESC
    }
  }
`

const BallotMeasureQuery = () => {
	return (
		<Query query={GET_BALLOTMEASURES}>
			{({ loading, error, data, client }) => {
				if (loading) {
					return <div>Loading...</div>
				}
				if (error) {
					console.error(error)
					return <div>Error!</div>
				}
				return (
					<BallotMeasure client={client} ballotmeasures={data.ballotmeasures} />
				)
			}}
		</Query>
	)
}

class BallotMeasure extends Component {
	state = {
		data: [],
		ballotmeasure: {
			election_id: "",
			bm_id: ""
		},
		Elections: [],
		BallotMeasures: [],
		isLoading: false
	}

	componentDidMount() {
		this.setState({ data: this.props.ballotmeasures, isLoading: false }, () => {
			this.initControls()
		})
	}

	//handle initial default selections here....get incoming props and set select option states.
	initControls = () => {
        console.log(this.state.data);
        const listOfElections = getDistinctOptions(
			this.state.data,
			"ELECTION_ID",
			"ELECTION_DESC"
		)

		const election_id = this.state.election_id || listOfElections[0].value

		//this.props.onClick({ election_id: election_id }, "ballotmeasure")
		this.handleSelect({ election_id: election_id }, "ballotmeasure")

		this.setState({ Elections: listOfElections })
		this.getListOfBallotMeasures(election_id, null)
	}

	getListOfBallotMeasures = (election_id) => {
		election_id = election_id || this.state.election_id

		let electionBMList = []
		electionBMList =
			election_id !== null
				? this.state.data.filter(
						el =>
							el.ELECTION_ID === election_id
				  )
				: this.state.data.filter(el => el.ELECTION_ID === election_id)

		const bm_list = optGroupBuilder(
			electionBMList,
			"",
			"BM_FULL_NAME",
			"BM_ID",
			"BM_GROUP_LABEL"
		)

		this.setState({ BallotMeasures: bm_list })
	}

	ElectionsSelectHandler = event => {
		const value = {
			election_id: event.value,
			bm_id: ""
		}

		this.handleSelect(value, "ballotmeasure")

		this.getListOfBallotMeasures(event.value, null)
	}

	BMSelectHandler = event => {
		const value = {
			bm_id: event.map(({ value }) => value).join()
		}
		this.handleSelect(value, "ballotmeasure")
	}

	handleSelect = (value, type) => {
		this.setState({
			[type]: {
				...this.state[type],
				...value
			}
		})
	}

	render() {
		const { Elections, BallotMeasures, isLoading } = this.state
		const {
            election_id,
            bm_id
		} = this.state.ballotmeasure

		//convert ballotmeasure props from comma delimited list to array of integers...Why, you ask? Because Multiselct requires value in array of objects format
		const bmProps = bm_id.split(",").map(Number)

		//flatten options array in ballotmeasure select list, then filter down to bm_id prop.
		const selectedBallotMeasures = BallotMeasures.reduce(
			(acc, currentValue) => acc.concat(currentValue.options),
			[]
		).filter(({ value }) => bmProps.indexOf(value) !== -1)

		return (
			<Grid container>
				<Grid item xs={12} style={{marginBottom: 4}}>
					<Select
						value={election_id}
						onChange={this.ElectionsSelectHandler}
						options={Elections}
						isLoading={isLoading}
					/>
				</Grid>
				<Grid item xs={12} style={{marginBottom: 4}}>
					<Select
						value={bm_id}
						onChange={this.BMSelectHandler}
						options={BallotMeasures}
						isLoading={isLoading}
					/>
				</Grid>
			</Grid>
		)
	}
}

export default BallotMeasureQuery
export { GET_BALLOTMEASURES }
