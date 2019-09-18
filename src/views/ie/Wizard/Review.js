import React, { Fragment } from "react"

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
import Icon from "@material-ui/core/Icon"
import EditIcon from "@material-ui/icons/Edit"
import ContentBox from "components/UI/Content/ContentBox"

import { review_box } from "views/ie/Wizard"


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

function createData1(date, name, desc, amount) {
	return { date, name, desc, amount }
}

const rows1 = [
	createData1("1/27/2018", "Bob Barnacastle", "Expenditures", "$100.00"),
	createData1("3/5/2019", "Billy Bob", "Gop takeover", "$350.00")
]

const Review = props => {
    const classes = useStyles()
    const {navigateToPage} = props
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
					<Fab
						onClick={() => navigateToPage(0)}
						size="small"
						className={classes.fab}>
						<EditIcon className={classes.icon} />
					</Fab>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={classes.grid}>
				<Grid item xs={12} sm={4}>
					<Typography variant="body1">
						Type: Independent Expenditure
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography variant="body1">
						Purpose: Independent Expenditure
					</Typography>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography variant="body1">
						LAUSD Candidate: Bob Macintosh
					</Typography>
				</Grid>
			</Grid>

			<Grid container spacing={1} className={classes.grid}>
				<Grid item xs={11}>
					<Typography variant="body1" gutterBottom>
						<b>Communication(s):</b>
					</Typography>
				</Grid>
				<Grid />
				<Fab
					onClick={() => navigateToPage(1)}
					size="small"
					display="flex"
					justifyContent="flex-end"
					className={classes.fab}>
					<EditIcon className={classes.icon} />
				</Fab>
			</Grid>
			<Grid container spacing={1} className={classes.grid}>
				<Grid item xs={12} sm={6}>
					<Typography variant="body1">
						Date First Distributed: 5/27/2018
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant="body1">
						Number of Pieces: 5/27/2018
					</Typography>
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
						<TableRow>
							<TableCell align="left">Flyer</TableCell>
							<TableCell align="left">ImFlying.pdf</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">Door Hanger</TableCell>
							<TableCell align="left">
								JustHangingOut.pdf
							</TableCell>
						</TableRow>
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
				<Fab
					onClick={() => navigateToPage(2)}
					size="small"
					display="flex"
					justifyContent="flex-end"
					className={classes.fab}>
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
						<TableRow>
							<TableCell align="left" style={{ width: "10px" }}>
								11/27/2018
							</TableCell>
							<TableCell align="center">
								Bob Barnacastle
							</TableCell>
							<TableCell align="center">
								Need more flyers
							</TableCell>
							<TableCell align="center">$225.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={1} />
							<TableCell colSpan={1}>
								Payee Vendor #1: The habedashery
							</TableCell>
							<TableCell colSpan={2} />
						</TableRow>
						<TableRow>
							<TableCell colSpan={1} />
							<TableCell colSpan={1}>
								Payee Vendor #2: The Parks and recreation
							</TableCell>
							<TableCell colSpan={2} />
						</TableRow>
						<TableRow>
							<TableCell align="left" style={{ width: "10px" }}>
								11/27/2019
							</TableCell>
							<TableCell align="center">
								The philibuster
							</TableCell>
							<TableCell align="center">Need more cats</TableCell>
							<TableCell align="center">$500.00</TableCell>
						</TableRow>
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
				<Fab
					onClick={() => navigateToPage(3)}
					size="small"
					display="flex"
					justifyContent="flex-end"
					className={classes.fab}>
					<EditIcon className={classes.icon} />
				</Fab>
			</Grid>
			<Paper className={classes.paper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left">
								Candidate or Committee Name
							</TableCell>
							<TableCell align="left">Date Contributed</TableCell>
							<TableCell align="left">
								Amount Contributed
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell align="left">Horseman</TableCell>
							<TableCell align="left">1/28/2018</TableCell>
							<TableCell align="left">$75.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">Penelope Cruz</TableCell>
							<TableCell align="left">4/28/2017</TableCell>
							<TableCell align="left">$35.00</TableCell>
						</TableRow>
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
				<Fab
					onClick={() => navigateToPage(4)}
					size="small"
					display="flex"
					justifyContent="flex-end"
					className={classes.fab}>
					<EditIcon className={classes.icon} />
				</Fab>
			</Grid>
			<Paper className={classes.paper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left">
								Contributor's Full Name
							</TableCell>
							<TableCell align="left">Date Recived</TableCell>
							<TableCell align="left">
								Amount Contributed
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell align="left">UnHorseman</TableCell>
							<TableCell align="left">9/9/2018</TableCell>
							<TableCell align="left">$29.95</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="left">Swatch</TableCell>
							<TableCell align="left">2/7/2017</TableCell>
							<TableCell align="left">$400.00</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Paper>

			<div className={classes.buttons}>
				<WizardBackButton {...props} />

				<Button
					className={classes.button}
					variant="contained"
					color="secondary"
					type="submit">
					Continue to E-sign
				</Button>
			</div>
		</Fragment>
	)
}

export default Review
