import React, { PureComponent, Fragment } from "react"
import { renderReactSelectField } from "components/Form/Inputs/renderInputs"
import { Field } from "formik"
import { optGroupBuilder, getDistinctOptions } from "utils/selectUtil"
import Grid from "@material-ui/core/Grid"
import { withApollo } from "react-apollo"
import { GET_COMMITTEES } from "graphql/ie/Queries"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"

import { renderRadioGroup } from "components/Form/Inputs/renderInputs"

class Committee extends PureComponent {
	state = {
		data: [],
		Committees: []
	}

	componentDidMount = async () => {
		

		const { client } = this.props
		const {
			data: { getCommittees }
		} = await client.query({ query: GET_COMMITTEES })
        
		this.setState({ data: getCommittees }, () => {
			this.initControls()
		})
	}

	//handle initial default selections here....get incoming props and set select option states.
	initControls = () => {
		const listOfElections = getDistinctOptions(this.state.data, "ELECTION_ID", "ELECTION_DESC")
		const election_id = this.props.values.ELECTION_ID || listOfElections[0].value
		this.setState({ Elections: listOfElections })
		this.getListOfSeats(election_id)
		this.getListOfCommittees(election_id, null)
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

	getListOfCommittees = (election_id, elec_seat_id) => {
		election_id = election_id || this.props.values.ELECTION_ID

		let seatList = []
		seatList =
			elec_seat_id !== null
				? this.state.data.filter(el => el.ELECTION_ID === election_id && el.ELEC_SEAT_ID === elec_seat_id)
				: this.state.data.filter(el => el.ELECTION_ID === election_id)

		const cand_list = optGroupBuilder(seatList, "PER_FNAME", "PER_LNAME", "ELEC_SEAT_CAND_ID", "ELEC_SEAT_LABEL")

		this.setState({ Committees: cand_list })
	}

	SelectHandler = (type, value) => {

		switch (type) {
			case "ELECTION_ID":
				this.props.setFieldValue("ELEC_SEAT_ID", null)
				this.props.setFieldValue("ELEC_SEAT_CAND_ID", null)
				this.getListOfSeats(value)
				this.getListOfCommittees(value, null)
				break
			case "ELEC_SEAT_ID":
				this.props.setFieldValue("ELEC_SEAT_CAND_ID", null)
				this.getListOfCommittees(null, value)
				break
			default:
                //if elec_seat_cand_id changed, init primary_general_flg
                this.props.setFieldValue("PRIMARY_GENERAL_FLG", "P") 			
        }
        

	}

	handlePrimaryGeneralFlg = () => {
		const { ELECTION_ID, ELEC_SEAT_ID, ELEC_SEAT_CAND_ID } = this.props.values
		let filterList = {}

		if (ELECTION_ID && ELEC_SEAT_ID && ELEC_SEAT_CAND_ID) {
			filterList = this.state.data.find(
				el => el.ELECTION_ID === ELECTION_ID && el.ELEC_SEAT_ID === ELEC_SEAT_ID && el.ELEC_SEAT_CAND_ID === ELEC_SEAT_CAND_ID
			)
        } 
        

		if (filterList && filterList.GENERAL_FLG) {
			return (
				<FormControl component="fieldset">
					<FormLabel component="legend">Election Type</FormLabel>
					<Field name="PRIMARY_GENERAL_FLG" component={renderRadioGroup} row>
						<FormControlLabel value="G" control={<Radio color="primary" />} label="General" labelPlacement="end" />
						<FormControlLabel value="P" control={<Radio color="primary" />} label="Primary" labelPlacement="end" />
					</Field>
				</FormControl>
			)
		}
	}

	render() {
		const { Elections, Seats, Committees, isLoading } = this.state
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
						type="number"
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
						type="number"
						placeholder="Select Seat..."
						disabled={!ELECTION_ID}
						isLoading={isLoading}
						component={renderReactSelectField}
					/>
				</Grid>
				<Grid item xs={12} style={{ marginBottom: 16 }}>
					<Field
						name="ELEC_SEAT_CAND_ID"
                        placeholder="Select Committee..."
                        SelectHandler={(type, value) => this.SelectHandler(type, value)}
						options={Committees}
						type="number"
						isLoading={isLoading}
						disabled={!ELEC_SEAT_ID}
						component={renderReactSelectField}
					/>
				</Grid>
				<Grid item xs={12}>
					{this.handlePrimaryGeneralFlg()}
				</Grid>
			</Grid>
		)
	}
}

export default withApollo(Committee)
