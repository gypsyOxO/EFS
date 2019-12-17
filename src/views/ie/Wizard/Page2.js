import React, { Fragment, useEffect } from "react"

import { Field, FieldArray } from "formik"
import { useMutation } from "@apollo/react-hooks"



import { Upload } from "components/Form/Upload/Upload"

import Paper from "@material-ui/core/Paper"
import AddIcon from "@material-ui/icons/Add"

import DeleteIcon from "@material-ui/icons/Delete"

import IconButton from "@material-ui/core/IconButton"

import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import WizardNextButton from "components/Wizard/WizardNextButton"
import WizardBackButton from "components/Wizard/WizardBackButton"

// import InputLabel from "@material-ui/core/InputLabel"
// import MenuItem from "@material-ui/core/MenuItem"
// import OutlinedInput from "@material-ui/core/OutlinedInput"

// import FormControl from "@material-ui/core/FormControl"
// import Select from "@material-ui/core/Select"
// import Input from "@material-ui/core/Input"

// import CloudUploadIcon from "@material-ui/icons/CloudUpload"

import ContentBox from "components/UI/Content/ContentBox"

import { communications_box } from "views/ie/Wizard"

import { makeStyles } from "@material-ui/core/styles"
import SelectCommType from "components/Form/Inputs/SelectCommType"

import OnChangeHandler from "components/UI/Utils/OnChangeHandler"
import { UPSERT_IND_EXP_COMM, UPDATE_IND_EXP,DELETE_IND_EXP_COMM } from "graphql/ie/Mutations"

import { graphqlFilter } from "utils/graphqlUtil"
import { filteredIEUpdate } from "graphql/ie/FilterQueries"

import * as pageValidations from "validation/ie/indexpSchema"


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

//const renderPayments = ({ fields, meta: { touched, error, submitFailed } }) => {

const RenderCommunications = props => {
	const classes = useStyles()
	const { arrayHelpers, upsertCommData,deleteCommData } = props

	//const comms = getIn(arrayHelpers.form.values, arrayHelpers.name)

	const { comms } = arrayHelpers.form.values
	const { errors, touched, setFieldValue } = arrayHelpers.form
	const initValues = { IE_COMM_ID: "", COMM_TYPE: "", DOC_FILE_NAME: "", AUDIO_FILE_NAME: "", VIDEO_FILE_NAME: "" }

	// const handleDateChange = date => {

	//     setFieldValue("DATE_DISTRIBUTED", date.toLocaleDateString())
    // }
    

    

	return (
		<div>
			<Typography variant="h6" gutterBottom className={classes.header}>
				Add Communication(s)
			</Typography>
			<ContentBox>{communications_box}</ContentBox>
			<div className={classes.buttons} style={{ marginRight: 10 }}>
				<Fab
					onClick={() => arrayHelpers.push(initValues)}
					variant="extended"
					size="medium"
					color="secondary"
					className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
					&nbsp;Add Communication
				</Fab>
			</div>

			<div>
				{comms &&
					comms.map((comm, index) => (
						<OnChangeHandler key={index} handleChange={() => upsertCommData(index, comm)}>
							<Paper key={index} className={classes.paper}>
								<Grid container>
									<Grid item xs={12} sm={11}>
										<Typography variant="body1" gutterBottom>
											<b>{`Communication #${index + 1}`}</b>
										</Typography>
									</Grid>
									<Grid item xs={12} sm={1}>
										<IconButton
                                            onClick={() => {
                                                comm.IE_COMM_ID && deleteCommData(comm)
                                                arrayHelpers.remove(index)
                                                
                                            }
                                        } //TODO: deletes file in temp directory? need warning popup dialog box
											aria-label="delete">
											<DeleteIcon />
										</IconButton>
									</Grid>
								</Grid>

								<Grid container spacing={3} className={classes.grid}>
									<SelectCommType index={index} comm={comm} />
								</Grid>
							</Paper>
						</OnChangeHandler>
					))}
			</div>
		</div>
	)
}

const Page2 = props => {
	
	const classes = useStyles()
	const { page, setFieldValue, values } = props

    //handle IE Updates
    const [updateIndExp] = useMutation(UPDATE_IND_EXP)

	const updateIEData = () => {    
  
		const filteredResult = graphqlFilter(filteredIEUpdate, values)
		updateIndExp({ variables: { IE_ID: values.IE_ID, ie: filteredResult } })
    }
    

    

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
    // const [deleteIndExpComm] = useMutation(DELETE_IND_EXP_COMM)

    // const deleteCommData = (communication) => {        
    //     deleteIndExpComm({variables: {IE_COMM_ID: communication.IE_COMM_ID}})
    // }


	return (
		<Fragment>
			<FieldArray
				name="comms"
				render={arrayHelpers => (
					<RenderCommunications
						arrayHelpers={arrayHelpers}
                        upsertCommData={(index, comm) => upsertCommData(index, comm)}
                        updateIEData={() => updateIEData()}
                        // deleteCommData={(comm) => deleteCommData(comm)}
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


