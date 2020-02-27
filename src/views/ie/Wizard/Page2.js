import React, { Fragment } from "react"

import { FieldArray } from "formik"
import { useMutation } from "@apollo/react-hooks"

import Paper from "@material-ui/core/Paper"
import AddIcon from "@material-ui/icons/Add"

import DeleteIcon from "@material-ui/icons/Delete"

import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"

import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import WizardNextButton from "components/Wizard/WizardNextButton"
import WizardBackButton from "components/Wizard/WizardBackButton"

import ContentBox from "components/UI/Content/ContentBox"

import { communications_box } from "views/ie/Wizard"

import { makeStyles } from "@material-ui/core/styles"
import SelectCommType from "components/Form/Inputs/SelectCommType"

import OnChangeHandler from "components/UI/Utils/OnChangeHandler"
import { UPSERT_IND_EXP_COMM, DELETE_IND_EXP_COMM, UPSERT_IND_EXP } from "graphql/ie/Mutations"
import useExpandClick from "components/UI/Paper/hooks/useExpandClick"

import { graphqlFilter } from "utils/graphqlUtil"
import { filteredIEUpsert } from "graphql/ie/FilterQueries"

import * as pageValidations from "validation/ie/indexpSchema"
import { disclaimer_comm } from "views/ie/Wizard"
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "components/Form/Inputs/Checkbox"

import useAddDeleteCard from "./hooks/useAddDeleteCard"

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
		marginBottom: theme.spacing(2)
	},
	grid: {
		marginBottom: theme.spacing(3)
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
	}
}))

const initValues = {
	IE_COMM_ID: "",
	COMM_TYPE: "",
	DOC_FILE_NAME: "",
	AUDIO_FILE_NAME: "",
	VIDEO_FILE_NAME: "",
	DISCLAIMERS: { required: false, color_original: false, language: false, funding_names: false }
}

const RenderCommunications = ({ arrayHelpers, arrayHelpers: { push, remove }, upsertCommData, deleteCommData, upsertIEData }) => {
	const { errors, touched, setFieldValue, setFieldError, setFieldTouched, validateForm, isValid } = arrayHelpers.form
	const classes = useStyles()

	const { comms = [] } = arrayHelpers.form.values

	const [expanded, ExpandButton, { handleExpandClick, addItem, deleteItem }] = useExpandClick(comms)

	const [{ addCard, deleteCard }] = useAddDeleteCard()

	return (
		<div>
			<ContentBox>{communications_box}</ContentBox>
			<div>
				{comms &&
					comms.map((comm, index) => (
						<Paper key={comm.IE_COMM_ID} className={classes.paper}>
							<OnChangeHandler handleChange={() => upsertCommData(index, comm)}>
								<Grid container>
									{expanded[index] ? (
										<Grid item xs={12} sm={10}>
											<Typography variant="body1" gutterBottom>
												<b>Choose a communication:</b>
											</Typography>
										</Grid>
									) : (
										<Grid item xs={12} sm={10} onClick={() => handleExpandClick(index)}>
											<Typography variant="body1" gutterBottom>
												<b>Type:&nbsp;</b>
												{comm.COMM_TYPE}
											</Typography>
										</Grid>
									)}

									<Grid item xs={12} sm={1}>
										<IconButton
											onClick={() => {
												comm.IE_COMM_ID && deleteCommData(comm)
												deleteCard(comms, index, remove, deleteItem)
											}}
											aria-label="delete">
											<DeleteIcon />
										</IconButton>
									</Grid>
									<Grid item xs={12} sm={1}>
										<ExpandButton index={index} onClick={() => handleExpandClick(index)} />
									</Grid>
								</Grid>
								<Collapse in={expanded[index]} unmountOnExit>
									<Grid container spacing={3} className={classes.grid}>
										<SelectCommType index={index} comm={comm} />
									</Grid>
								</Collapse>
							</OnChangeHandler>
						</Paper>
					))}
			</div>
			<OnChangeHandler handleChange={() => upsertIEData()}>
				{!comms.length && (
					<Grid container spacing={3} style={{ paddingTop: 20, marginLeft: 10, paddingRight: 50 }}>
						<Grid item>
							<FormControl component="fieldset">
								<Checkbox name="REP_COMM" label={disclaimer_comm} />
							</FormControl>
						</Grid>
					</Grid>
				)}
			</OnChangeHandler>
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => addCard(initValues, comms, push, addItem)}
					variant="extended"
					size="medium"
					color={isValid ? "secondary" : "default"}
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Communication
				</Fab>
			</div>
		</div>
	)
}

const Page2 = props => {
	const classes = useStyles()
	const { setFieldValue, values } = props

	//handle IE Comm updates
	const [upsertIndExpComm] = useMutation(UPSERT_IND_EXP_COMM)

	const upsertCommData = async (index, communication) => {
		const { IE_ID } = values
		const commPayload = {
			...communication,
			IE_ID
		}

		if (commPayload.IE_COMM_ID === "") {
			delete commPayload.IE_COMM_ID
		}

		commPayload.__typename && delete commPayload.__typename

		const { data } = await upsertIndExpComm({ variables: { comm: commPayload } })

		setFieldValue(`comms.${index}.IE_COMM_ID`, data.upsertIndExpComm.IE_COMM_ID)
	}

	//handle IE Comm deletes
	const [deleteIndExpComm] = useMutation(DELETE_IND_EXP_COMM)

	const deleteCommData = communication => {
		deleteIndExpComm({ variables: { IE_COMM_ID: communication.IE_COMM_ID } })
	}

	const [upsertIndExp] = useMutation(UPSERT_IND_EXP)

	const upsertIEData = () => {
		const filteredResult = graphqlFilter(filteredIEUpsert, values)
		upsertIndExp({ variables: { ie: filteredResult } })
	}

	return (
		<Fragment>
			<FieldArray
				name="comms"
				render={arrayHelpers => (
					<RenderCommunications
						arrayHelpers={arrayHelpers}
						upsertCommData={(index, comm) => upsertCommData(index, comm)}
						deleteCommData={comm => deleteCommData(comm)}
						upsertIEData={() => upsertIEData()}
					/>
				)}
			/>

			<div className={classes.buttons}>
				<WizardBackButton {...props} />
				<WizardNextButton {...props} validationGroup={pageValidations.Page2} />
			</div>
		</Fragment>
	)
}

export default Page2
