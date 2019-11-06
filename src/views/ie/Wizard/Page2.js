import React, { Fragment, useEffect } from "react"

import { Field, FieldArray } from "formik"

import { renderTextField } from "components/Form/Inputs/renderInputs"

import { Upload } from "components/Form/Upload/Upload"
//import {Files} from 'components/Form/Upload/Files'

// import Box from "@material-ui/core/Box"
// import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import AddIcon from "@material-ui/icons/Add"

import DeleteIcon from "@material-ui/icons/Delete"

import IconButton from "@material-ui/core/IconButton"

import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import WizardNextButton from "components/Wizard/WizardNextButton"
import WizardBackButton from "components/Wizard/WizardBackButton"

import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import OutlinedInput from "@material-ui/core/OutlinedInput"

import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"

import CloudUploadIcon from "@material-ui/icons/CloudUpload"
//import CommunicationBox from "../../assets/IE/communcations/CommunicationBox"
import ContentBox from "components/UI/Content/ContentBox"

import { communications_box } from "views/ie/Wizard"

//import { GET_COMM_TYPES } from "graphql/ie/Queries"

//import { renderReactSelectField } from "components/Form/Inputs/renderInputs"

import { makeStyles } from "@material-ui/core/styles"
import SelectCommType from "components/Form/Inputs/SelectCommType"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(1),
		overflowX: "auto"
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		marginLeft: theme.spacing(1)
	},
	paper: {
		padding: 10,
		marginBottom: theme.spacing(3)
	},
	grid: {
		marginBottom: theme.spacing(3)
	},
	expand: {
		display: "flex",
		justifyContent: "flex-end"
	},
	script: {
		marginLeft: theme.spacing(4),
		marginTop: theme.spacing(1)
	},
	upload: {
		marginRight: theme.spacing(1)
	},
	icon: {
		margin: theme.spacing(2),
		color: "red"
	},
	rightIcon: {
		marginLeft: theme.spacing(1)
	},
	header: {
		display: "flex",
		justifyContent: "center",
		marginBottom: theme.spacing(4)
	},
	margins: {
		margin: theme.spacing(2)
	},
	dropzone: {
		fontFamily: "roboto",
		fontSize: "1rem"
	},
	dropzoneContainer: {
		display: "flex",
		justifyContent: "center"
	}
}))

const handleClickAway = event => {
    console.log("clicked", event )
}

//const renderPayments = ({ fields, meta: { touched, error, submitFailed } }) => {

const RenderCommunications = arrayHelpers => {
	const classes = useStyles()
	const { communications } = arrayHelpers.form.values

	return (
		<div>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Add Communication(s)
			</Typography>
			<ContentBox>{communications_box}</ContentBox>

			<Grid container spacing={3} className={classes.grid}>
				<Grid item xs={12} style={{ marginTop: 20 }}>
					<Typography variant="body2">Distribution:</Typography>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Field
						name="DatefirstDistributed"
						type="text"
						component={renderTextField}
						fullWidth
						label="Date First Distributed"
					/>
				</Grid>
				<Grid item xs={12} sm={9}>
					<Field
						name="numberOfPieces"
						type="text"
						component={renderTextField}
						fullWidth
						label="Number of Pieces"
					/>
				</Grid>
			</Grid>

			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => arrayHelpers.push()}
					variant="extended"
					size="medium"
					color="secondary"
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Communication
				</Fab>

				{/* {(touched || submitFailed) && error && <span>{error}</span>} */}
			</div>
            <ClickAwayListener onClickAway={handleClickAway}>
            <div>
			{communications &&
				communications.map((communication, index) => (
                    
					<Paper key={index} className={classes.paper} >
						<Grid container>
							<Grid item xs={12} sm={11}>
								<Typography variant="body1" gutterBottom>
									<b>{`Communication #${index + 1}`}</b>
								</Typography>
							</Grid>
							<Grid item xs={12} sm={1}>
								<IconButton
									onClick={() => arrayHelpers.remove(index)} //TODO: deletes file in temp directory? need warning popup dialog box
									aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</Grid>
						</Grid>

						<Grid container spacing={3} className={classes.grid}>
							<SelectCommType
								index={index}
								{...communication}
								
							/>
                        </Grid>


					</Paper>
                
                ))}
            </div>
            </ClickAwayListener>
		</div>
	)
}

const Page2 = props => {
	//const { handleSubmit } = props
	const classes = useStyles()

	return (
		<Fragment>
            
			<FieldArray
				name="communications"
				component={RenderCommunications}
			/>
            
			<div className={classes.buttons}>
				<WizardBackButton {...props} />
				<WizardNextButton {...props} />
			</div>
		</Fragment>
	)
}

export default Page2

//  <Grid
// 	container
// 	alignItems="center"
// 	className={classes.script}
// 	gutterTop>
// 	<Grid item sm={4} className={classes.upload}>
// 		<input
// 			accept="image/*"
// 			className={classes.input}
// 			style={{ display: "none" }}
// 			id="raised-button-file"
// 			multiple
// 			type="file"
// 		/>
// 		<label htmlFor="raised-button-file">
// 			<Button
// 				variant="contained"
// 				className={classes.upload}
// 				component="span"
// 				color="primary"
// 				fullWidth>
// 				Upload Script (<b>PDF</b>)
// 				<CloudUploadIcon
// 					className={classes.rightIcon}
// 				/>
// 			</Button>
// 		</label>
// 	</Grid>

// 	<Grid item>
// 		<Typography variant="body1">
// 			No File Chosen
// 		</Typography>
// 	</Grid>
// </Grid>
// <Grid
// 	container
// 	alignItems="center"
// 	className={classes.script}
// 	gutterTop>
// 	<Grid item className={classes.upload} sm={4}>
// 		<input
// 			accept="image/*"
// 			className={classes.input}
// 			style={{ display: "none" }}
// 			id="raised-button-file"
// 			multiple
// 			type="file"
// 		/>
// 		<label htmlFor="raised-button-file">
// 			<Button
// 				color="primary"
// 				variant="contained"
// 				component="span"
// 				fullWidth>
// 				Upload Video (<b>MP4</b>)
// 				<CloudUploadIcon
// 					className={classes.rightIcon}
// 				/>
// 			</Button>
// 		</label>
// 	</Grid>

// 	<Grid item>
// 		<Typography variant="body1">
// 			No File Chosen
// 		</Typography>
// 	</Grid>
// </Grid>
