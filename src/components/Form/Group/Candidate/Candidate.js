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
import { ColorSelect } from "react-select-material-ui";

// This makes the assumption elec_seat_cand_id is stored in comma delmited list. Ideally it is stored in arrays, but this might be in a more nosql environment

const GET_CANDIDATES = gql`
	query {
		candidates {
			ELECTION_ID
			ELECTION_DESC
			ELEC_SEAT_ID
			ELEC_SEAT_CAND_ID
			CAND_PER_ID
			PER_FNAME
			PER_LNAME
			ELEC_SEAT_LABEL
			JURIS_ID
		}
	}
`

const CandidateQuery = () => {
	return (
		<Query query={GET_CANDIDATES}>
			{({ loading, error, data, client }) => {
				if (loading) {
					return <div>Loading...</div>
				}
				if (error) {
					console.error(error)
					return <div>Error!</div>
				}
				return (
					<Candidate client={client} candidates={data.candidates} />
				)
			}}
		</Query>
	)
}

class Candidate extends Component {
	state = {
		data: [],
		candidate: {
			election_id: 57,
			elec_seat_id: "",
			elec_seat_cand_id: ""
		},
		Elections: [],
		Seats: [],
		Candidates: [],
		isLoading: false
	}

	componentDidMount() {
		this.setState({ data: this.props.candidates, isLoading: false }, () => {
			this.initControls()
		})
	}

	//handle initial default selections here....get incoming props and set select option states.
	initControls = () => {
		const listOfElections = getDistinctOptions(
			this.state.data,
			"ELECTION_ID",
			"ELECTION_DESC"
		)

		const election_id = this.state.election_id || listOfElections[0].value

		//this.props.onClick({ election_id: election_id }, "candidate")
		this.handleSelect({ election_id: election_id }, "candidate")

		this.setState({ Elections: listOfElections })
		this.getListOfSeats(election_id)
		this.getListOfCandidates(election_id, null)
	}

	getListOfSeats = election_id => {
		//filter list of seats and candidate list down to election_id and election_seat_id

		const listOfSeats = [
			{ value: "", label: "All Seats" },
			...getDistinctOptions(
				this.state.data.filter(
					({ ELECTION_ID }) => ELECTION_ID === election_id
				),
				"ELEC_SEAT_ID",
				"ELEC_SEAT_LABEL"
			)
		]

		this.setState({ Seats: listOfSeats })
	}

	getListOfCandidates = (election_id, elec_seat_id) => {
		election_id = election_id || this.state.candidate.election_id
		//console.log(this.state.candidate.election_id, "this.state.candidate.election_id")
		//console.log(election_id, "election_id")
		let seatList = []
		seatList =
			elec_seat_id !== null
				? this.state.data.filter(
						el =>
							el.ELECTION_ID === election_id &&
							el.ELEC_SEAT_ID === elec_seat_id
				  )
				: this.state.data.filter(el => el.ELECTION_ID === election_id)

		const cand_list = optGroupBuilder(
			seatList,
			"PER_FNAME",
			"PER_LNAME",
			"CAND_PER_ID",
			"ELEC_SEAT_LABEL"
		)

		this.setState({ Candidates: cand_list })
	}

	ElectionsSelectHandler = event => {
		const value = {
			election_id: event.value,
			elec_seat_id: "",
			elec_seat_cand_id: ""
		}

		this.handleSelect(value, "candidate")

		this.getListOfSeats(event.value)
		this.getListOfCandidates(event.value, null)
	}

	SeatsSelectHandler = event => {
		//console.log("SeatsSelectHandler->event", event)
		const value = { elec_seat_id: event.value, elec_seat_cand_id: "" }
		this.handleSelect(value, "candidate")
		this.getListOfCandidates(null, event.value)
	}

	CandSelectHandler = event => {
		const value = {
			//elec_seat_cand_id: event.map(({ value }) => value).join()
			elec_seat_cand_id: event.value
		}
		this.handleSelect(value, "candidate")
	}

	handleSelect = (value, type) => {
		this.setState({
			[type]: {
				...this.state[type],
				...value
			}
		})
		console.log(this.state)
	}

	render() {
		const { Elections, Seats, Candidates, isLoading } = this.state
		const {
			election_id,
			elec_seat_id,
			elec_seat_cand_id
		} = this.state.candidate

		//convert candidate props from comma delimited list to array of integers...Why, you ask? Because Multiselct requires value in array of objects format
		/*const candProps = elec_seat_cand_id.split(",").map(Number)

		//flatten options array in candidate select list, then filter down to elec_seat_cand_id prop.
		const selectedCandidates = Candidates.reduce(
			(acc, currentValue) => acc.concat(currentValue.options),
			[]
		).filter(({ value }) => candProps.indexOf(value) !== -1)*/

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
						value={elec_seat_id}
						onChange={this.SeatsSelectHandler}
						options={Seats}
						isLoading={isLoading}
					/>
				</Grid>
				<Grid item xs={12} style={{marginBottom: 4}}>
					<Select
						value={elec_seat_cand_id}
						onChange={this.CandSelectHandler}
						placeholder="Select Candidate"
						options={Candidates}
						isLoading={isLoading}
					/>
				</Grid>
			</Grid>
		)
	}
}

export default CandidateQuery
export { GET_CANDIDATES }
