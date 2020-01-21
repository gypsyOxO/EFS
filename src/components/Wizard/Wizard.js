import React, { Fragment } from "react"

import { Formik } from "formik"
import { useMutation } from "@apollo/react-hooks"
//import * as Yup from "yup"
import { DisplayFormikState } from "./helper"

import Wiz from "./Wiz"
import { makeStyles } from "@material-ui/core/styles"

//import PropTypes from "prop-types"
import CssBaseline from "@material-ui/core/CssBaseline"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepButton from "@material-ui/core/StepButton"

import { Page1, Page2, Page3, Page4, Page5, Review } from "views/ie/Wizard"

import { graphqlFilter } from "utils/graphqlUtil"
import { filteredSubmit } from "graphql/ie/FilterQueries"


import { indexpSchema } from "validation/ie/indexpSchema"
import isEmpty from "lodash/isEmpty"

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

    const steps = ["Purpose", "Communications", "Payments", "Contributions Made", "Contributions Received", "Review"]
        
	const handleSubmit = async document_id => {

		window.location.href = process.env.REACT_APP_DOMAIN + process.env.REACT_APP_JUMPLINK_PATH + "?id=" + document_id
	}
   
	return (
		<Fragment>
			<CssBaseline>
				<main className={classes.layout}>
					<Wiz pages={[Page1, Page2, Page3, Page4, Page5, Review]}>
						{wizProps => {
							return (
								<div>
									<Formik
                                        
										enableReinitialize
										initialValues={props.initValues}
										validationSchema={indexpSchema}
										onSubmit={(values) => {
											handleSubmit(values.IE_ID)
										}}>
										{props => {
											const { handleSubmit, values } = props

											const result = graphqlFilter(filteredSubmit, {...values})

											return (
												<form onSubmit={handleSubmit}>
													{process.env.REACT_APP_IS_LOCAL_DEV === "true" && JSON.stringify(props.errors)}
													<Stepper
														alternativeLabel
														nonLinear={isEmpty(props.errors)}
														activeStep={wizProps.pageIndex}
														className={classes.stepper}>
														{steps.map((label, index) => (
															<Step key={label}>
																<StepButton onClick={() => wizProps.navigateToPage(index)}>{label}</StepButton>
															</Step>
														))}
													</Stepper>

													{wizProps.renderPage(props)}

													{process.env.REACT_APP_IS_LOCAL_DEV === "true" && JSON.stringify(result)}
													{process.env.REACT_APP_IS_LOCAL_DEV === "true" && <DisplayFormikState {...props} />}
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
