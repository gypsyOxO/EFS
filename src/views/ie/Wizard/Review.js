import React, { Fragment, useEffect, useState } from "react"

import { useQuery } from "@apollo/react-hooks"

import { GET_CANDIDATE_OR_BALLOTMEASURE_NAME } from "graphql/ie/Queries"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import WizardBackButton from "components/Wizard/WizardBackButton"
import Fab from "@material-ui/core/Fab"
import EditIcon from "@material-ui/icons/Edit"
import ContentBox from "components/UI/Content/ContentBox"

import { review_box } from "views/ie/Wizard"

import { convertISODateToJsDate } from "utils/dateUtil"

const useStyles = makeStyles(theme => ({
	listItem: {
		padding: theme.spacing(1, 0)
	},
	total: {
		fontWeight: "700"
	},
	title: {
		marginTop: theme.spacing(2)
	},
	root: {
		width: "100%",
		marginTop: theme.spacing(3),
		overflowX: "auto"
	},
	table: {
		minWidth: 650
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing(4),
		marginLeft: theme.spacing(1)
	},
	grid: {
		marginBottom: theme.spacing(3)
	},
	center: {
		display: "flex",
		justifyContent: "center"
	},
	fab: {
		backgroundColor: "#ff1744"
	},
	icon: {
		color: "#fff"
	},
	header: {
		display: "flex",
		justifyContent: "center",
		marginBottom: theme.spacing(4)
	},
	paper: {
		margin: theme.spacing(3),
		marginBottom: theme.spacing(6)
	}
}))

const Review = props => {
	const classes = useStyles()
	const {
		navigateToPage,
		values,
		values: { comms, payments, CONTRIBUTIONS_MADE, CONTRIBUTIONS_RECEIVED, BM_ID, ELEC_SEAT_CAND_ID, SUBJECT }
	} = props

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    

	//gets info about candidate or ballot measure from the cache
	const {
		data: { getCandidateOrBallotMeasureName: candidateOrBallotMeasureName = "" }
	} = useQuery(GET_CANDIDATE_OR_BALLOTMEASURE_NAME, { variables: { id: BM_ID ? BM_ID : ELEC_SEAT_CAND_ID, type: SUBJECT } })

	useEffect(() => {
        candidateOrBallotMeasureName && setName(candidateOrBallotMeasureName.name)
        candidateOrBallotMeasureName && setType(candidateOrBallotMeasureName.type)
	}, [candidateOrBallotMeasureName])

	return (
		<Fragment>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Review
			</Typography>
			<ContentBox>{review_box}</ContentBox>
			<br />
			<br />
			<Grid container spacing={1} className={classes.grid}>
				<Grid item xs={11}>
					<Typography variant="body1" gutterBottom>
						<b>Communication summary</b>
					</Typography>
				</Grid>
				<Grid>
					<Fab onClick={() => navigateToPage(0)} size="small" className={classes.fab}>
						<EditIcon className={classes.icon} />
					</Fab>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={classes.grid}>
				<Grid item xs={12} sm={4}>
					<Typography variant="body2">
						<b>Type:</b> {values.MC_FLG ? (values.MC_FLG === "0" ? "Independent Expenditure" : "Membership Communication") : null}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Typography variant="body2">
						<b>Purpose:</b> {values.SUPPORT_OPPOSE_FLG ? (values.SUPPORT_OPPOSE_FLG === "S" ? "Support" : "Oppose") : null}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={5}>
					<Typography variant="body2"><b>{type}:</b>&nbsp;{name}</Typography>
				</Grid>
			</Grid>

			<Grid container spacing={1} className={classes.grid}>
				<Grid item xs={11}>
					<Typography variant="body1" gutterBottom>
						<b>Communication(s):</b>
					</Typography>
				</Grid>
				<Grid />
				<Fab onClick={() => navigateToPage(1)} size="small" display="flex" className={classes.fab}>
					<EditIcon className={classes.icon} />
				</Fab>
			</Grid>
			<Grid container spacing={1} className={classes.grid}>
				<Grid item xs={12} sm={6}>
					<Typography variant="body2">
						<b>Date First Distributed:</b> {values.DATE_DISTRIBUTED ? convertISODateToJsDate(values.DATE_DISTRIBUTED) : "N/A"}
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant="body2"><b>Number of Pieces:</b> {values.NUM_DISTRIBUTED}</Typography>
				</Grid>
			</Grid>
			<Paper className={classes.paper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Format</TableCell>

							<TableCell align="left">File Name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{comms &&
							comms.map(comm => {
								let files = [comm.AUDIO_FILE_NAME, comm.VIDEO_FILE_NAME, comm.DOC_FILE_NAME]

								//Reducer: converts filenames to array, if blank then dont include in final array

								files = Object.entries(files)
									.reduce((tableCellLabel, filename) => {
										filename[1] && tableCellLabel.push(filename[1])
										return tableCellLabel
									}, [])
									.join(",")

								return (
									<TableRow key={comm.IE_COMM_ID}>
										<TableCell align="left">{comm.COMM_TYPE}</TableCell>
										<TableCell align="left">{files}</TableCell>
									</TableRow>
								)
							})}
					</TableBody>
				</Table>
			</Paper>

			<Grid container spacing={1} className={classes.grid}>
				<Grid item xs={11}>
					<Typography variant="body1" gutterBottom>
						<b>Payment(s):</b>
					</Typography>
				</Grid>
				<Grid />
				<Fab onClick={() => navigateToPage(2)} size="small" display="flex" className={classes.fab}>
					<EditIcon className={classes.icon} />
				</Fab>
			</Grid>

			<Paper className={classes.paper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left" style={{ width: "10px" }}>
								Date
							</TableCell>
							<TableCell align="center">Payee</TableCell>
							<TableCell align="center">Desc</TableCell>
							<TableCell align="center">Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{payments &&
							payments.map((payment, index) => {
								const { IE_PAYEE_VENDORS } = payment

								const vendors =
									IE_PAYEE_VENDORS &&
									IE_PAYEE_VENDORS.map((vendor, vindex) => (
										<TableRow key={vindex}>
											<TableCell colSpan={1} />
											<TableCell align="left">
												Payee Vendor#{vindex + 1}: &nbsp;{vendor.IE_PAYMENT_VENDOR_LNAME}
											</TableCell>
											<TableCell colSpan={2} />
										</TableRow>
									))
								return (
									<Fragment key={index}>
										<TableRow>
											<TableCell align="left" style={{ width: "10px" }}>
												{payment.IE_PAYMENT_DATE ? convertISODateToJsDate(payment.IE_PAYMENT_DATE) : "N/A"}
											</TableCell>
											<TableCell align="center">{payment.IE_PAYEE}</TableCell>
											<TableCell align="center">{payment.IE_PAYMENT_DESC}</TableCell>
											<TableCell align="center" style={{ width: "10px" }}>
												{payment.IE_PAYMENT_AMT ? "$" + Number.parseFloat(payment.IE_PAYMENT_AMT).toFixed(2) : "N/A"}
											</TableCell>
										</TableRow>
										{vendors}
									</Fragment>
								)
							})}
					</TableBody>
				</Table>
			</Paper>

			<Grid container spacing={1} className={classes.grid}>
				<Grid item xs={11}>
					<Typography variant="body1" gutterBottom>
						<b>Contribution(s) Made:</b>
					</Typography>
				</Grid>
				<Grid />
				<Fab onClick={() => navigateToPage(3)} size="small" display="flex" className={classes.fab}>
					<EditIcon className={classes.icon} />
				</Fab>
			</Grid>
			<Paper className={classes.paper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Date Contributed</TableCell>
							<TableCell align="left">Candidate or Committee Name</TableCell>
							<TableCell align="left">Amount Contributed</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{CONTRIBUTIONS_MADE &&
							CONTRIBUTIONS_MADE.map((contribution, index) => (
								<TableRow key={index}>
									<TableCell align="left">
										{contribution.dateContributed ? convertISODateToJsDate(contribution.dateContributed) : "N/A"}
									</TableCell>
									<TableCell align="left">{contribution.candidateOrCommitteeName}</TableCell>
									<TableCell align="left">
										{contribution.amountContributed ? "$" + Number.parseFloat(contribution.amountContributed).toFixed(2) : "N/A"}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</Paper>

			<Grid container spacing={1} className={classes.grid}>
				<Grid item xs={11}>
					<Typography variant="body1" gutterBottom>
						<b>Contribution(s) Received:</b>
					</Typography>
				</Grid>
				<Grid />
				<Fab onClick={() => navigateToPage(4)} size="small" display="flex" className={classes.fab}>
					<EditIcon className={classes.icon} />
				</Fab>
			</Grid>
			<Paper className={classes.paper}>
				<Table className={classes.table}>
					<TableHead>                        
						<TableRow>
                            <TableCell align="left">Date Recived</TableCell>
							<TableCell align="left">Contributor's Full Name</TableCell>
							<TableCell align="left">Amount Contributed</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{CONTRIBUTIONS_RECEIVED &&
							CONTRIBUTIONS_RECEIVED.map((contribution, index) => (
								<TableRow key={index}>                                    
									<TableCell align="left">{contribution.dateReceived ? convertISODateToJsDate(contribution.dateReceived) : "N/A"}</TableCell>	
                                    <TableCell align="left">{contribution.contributorFullName}</TableCell>
									<TableCell align="left">
										{contribution.amountReceived ? "$" + Number.parseFloat(contribution.amountReceived).toFixed(2) : "N/A"}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</Paper>

			<div className={classes.buttons}>
				<WizardBackButton {...props} />

				<Button className={classes.button} variant="contained" color="secondary" type="submit">
					Continue to E-sign
				</Button>
			</div>
		</Fragment>
	)
}

export default Review
