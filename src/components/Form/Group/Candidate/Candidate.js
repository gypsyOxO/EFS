import React, { PureComponent } from "react"
import { renderReactSelectField } from "components/Form/Inputs/renderInputs"
import { Field } from "formik"
import { optGroupBuilder, getDistinctOptions } from "utils/selectUtil"
import Grid from "@material-ui/core/Grid"
import { withApollo } from "react-apollo"
import { GET_CANDIDATES } from "graphql/ie/Queries"

class Candidate extends PureComponent {
	state = {
		data: [],
		Elections: [],
		Seats: [],
		Candidates: []
	}

	componentDidMount = async () => {
		//get data directly from apollo store??? or populate state????

		const { client } = this.props
		const {
			data: { getCandidates }
		} = await client.query({ query: GET_CANDIDATES })

		this.setState({ data: getCandidates}, () => {
			this.initControls()
		})
	}

	//handle initial default selections here....get incoming props and set select option states.
	initControls = () => {
		const listOfElections = getDistinctOptions(this.state.data, "ELECTION_ID", "ELECTION_DESC")
		const election_id = this.props.values.ELECTION_ID || listOfElections[0].value
		this.setState({ Elections: listOfElections })
		this.getListOfSeats(election_id)
		this.getListOfCandidates(election_id, null)
	}

	getListOfSeats = election_id => {
		//filter list of seats and candidate list down to election_id and election_seat_id

		const listOfSeats = [
			...getDistinctOptions(
				this.state.data.filter(({ ELECTION_ID }) => ELECTION_ID === election_id),
				"ELEC_SEAT_ID",
				"ELEC_SEAT_LABEL"
			)
		]

		this.setState({ Seats: listOfSeats })
	}

	getListOfCandidates = (election_id, elec_seat_id) => {
		election_id = election_id || this.props.values.ELECTION_ID

		let seatList = []
		seatList =
			elec_seat_id !== null
				? this.state.data.filter(el => el.ELECTION_ID === election_id && el.ELEC_SEAT_ID === elec_seat_id)
				: this.state.data.filter(el => el.ELECTION_ID === election_id)

		const cand_list = optGroupBuilder(seatList, "PER_FNAME", "PER_LNAME", "ELEC_SEAT_CAND_ID", "ELEC_SEAT_LABEL")

		this.setState({ Candidates: cand_list })
	}

	SelectHandler = (type, value) => {
		switch (type) {
			case "ELECTION_ID":
				this.props.setFieldValue("ELEC_SEAT_ID", null)
				this.props.setFieldValue("ELEC_SEAT_CAND_ID", null)
				this.getListOfSeats(value)
				this.getListOfCandidates(value, null)
				break
			case "ELEC_SEAT_ID":
				this.props.setFieldValue("ELEC_SEAT_CAND_ID", null)
				this.getListOfCandidates(null, value)
				break
			default:
			//TODO: handle ELEC_SEAT_CAND_ID
		}
	}

	render() {
		const { Elections, Seats, Candidates, isLoading } = this.state
		const {
			values: { ELECTION_ID, ELEC_SEAT_ID }
		} = this.props

		return (
			<Grid container>
				<Grid item xs={12} style={{ marginBottom: 4 }}>
					<Field
						name="ELECTION_ID"
						options={Elections}
						SelectHandler={(type, value) => this.SelectHandler(type, value)}
						placeholder="Select Election..."
						isLoading={isLoading}
						clearDependentFields="ELEC_SEAT_ID,ELEC_SEAT_CAND_ID"
						component={renderReactSelectField}
					/>
				</Grid>
				<Grid item xs={12} style={{ marginBottom: 4 }}>
					<Field
						name="ELEC_SEAT_ID"
						SelectHandler={(type, value) => this.SelectHandler(type, value)}
						options={Seats}
						placeholder="Select Seat..."
						disabled={!ELECTION_ID}
						isLoading={isLoading}
						component={renderReactSelectField}
					/>
				</Grid>
				<Grid item xs={12} style={{ marginBottom: 4 }}>
					<Field
						name="ELEC_SEAT_CAND_ID"
						placeholder="Select Candidate..."
						options={Candidates}
						isLoading={isLoading}
						disabled={!ELEC_SEAT_ID}
						component={renderReactSelectField}
					/>
				</Grid>
			</Grid>
		)
	}
}

export default withApollo(Candidate)
