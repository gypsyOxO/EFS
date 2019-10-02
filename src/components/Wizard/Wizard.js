import React, { Fragment} from "react"

import { Formik } from "formik"
//import * as Yup from "yup"
import { DisplayFormikState } from "./helper"

import Wiz from "./Wiz"
import { makeStyles } from "@material-ui/core/styles"

import { useMutation } from "@apollo/react-hooks"

//import PropTypes from "prop-types"
import CssBaseline from "@material-ui/core/CssBaseline"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepButton from "@material-ui/core/StepButton"

import { Page1, Page2, Page3, Page4, Page5, Review } from "views/ie/Wizard"

import { graphqlFilter } from "utils/graphqlUtil"
import gql from "graphql-tag"
import { loader } from "graphql.macro"
const ADD_IE = loader("../../graphql/ie/createIE.graphql")


const useStyles = makeStyles(theme => ({
	appBar: {
		position: "relative"
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
			width: 800,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	stepper: {
		padding: theme.spacing(3, 0, 5)
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	}
}))


export default function Wizard(props) {

    const classes = useStyles()
    
	const steps = [
		"Purpose",
		"Communications",
		"Payments",
		"Contributions Made",
		"Contributions Received",
		"Review"
	]


    //TODO: move to graphql folder after testing more sophisticated queries
	const query = gql`
		query {
			indexp
			CMT_PER_ID
			MC_FLG
			ELECTION_ID
			SUPPORT_OPPOSE_FLG
			BM_ID
		}
	`

	const [createIE] = useMutation(ADD_IE)

	const handleCreate = async ({ filteredResult, createIE }) => {
		const createResult = await createIE({
			variables: { ie: { ...filteredResult } }
		})

		window.location.href =
			"http://cecwebtest.ci.la.ca.us/CFCs/Landing/ie?id=" +
			createResult.data.createIE.IE_ID
	}

	return (
		<Fragment>
			<CssBaseline>
				<main className={classes.layout}>
					<Wiz
						pages={[
							Page1,
							Page2,
							Page3,
							Page4,
							Page5,
							Review

							//, Page3, Page4, Page5, Review
						]}>
						{wizProps => {
							return (
								<div>
									<Stepper
										alternativeLabel
										nonLinear
										activeStep={wizProps.pageIndex}
										className={classes.stepper}>
										{steps.map((label, index) => (
											<Step key={label}>
												<StepButton
													onClick={() =>
														wizProps.navigateToPage(
															index
														)
													}>
													{label}
												</StepButton>
											</Step>
										))}
									</Stepper>
									<Formik
										enableReinitialize
										initialValues={props.initValues}
										onSubmit={(values, { resetForm }) => {


                                            //TODO: need to strip ie_id if it is set to 0, can we make this a boolean in graphqlfilter,
                                            //exists only if it is greater than 0    

											const filteredResult = graphqlFilter(
												query,
												values
											)

											handleCreate({
												filteredResult,
												createIE
											})
										}}>
										{props => {
											const {
												handleSubmit,
												values
											} = props

											const result = graphqlFilter(
												query,
												values
											)

											return (
												<form onSubmit={handleSubmit}>
													{wizProps.renderPage(props)}
													{JSON.stringify(result)}
													<DisplayFormikState
														{...props}
													/>
												</form>
											)
										}}
									</Formik>
								</div>
							)
						}}
					</Wiz>
				</main>
			</CssBaseline>
		</Fragment>
	)
}
