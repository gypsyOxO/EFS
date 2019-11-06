import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import { Field } from "formik"
import { renderReactSelectField } from "./renderInputs"
import UploadCommType from "../Upload/UploadCommType"
import { useQuery } from "@apollo/react-hooks"
import { GET_COMM_TYPES } from "graphql/ie/Queries"
import { getDistinctOptions } from "utils/selectUtil"

const SelectCommType = props => {
    const { loading, error, data } = useQuery(GET_COMM_TYPES)
    const {index} = props //index in formik commmunications array

    // Used for options in select; returns null if no data result from graphql 
	const listOfCommTypes =
		"commtypes" in data
			? getDistinctOptions(data.commtypes, "COMM_TYPE", "COMM_TYPE_DESC")
			: null

    // Gets select commtype from graphql call to communication_types table; result includes flags for audio video and doc uploads; returns null if no commtype selected         
	const selectedCommtype =
		"COMM_TYPE" in props
			? data.commtypes.find(commtype => commtype.COMM_TYPE === props.COMM_TYPE)
			: null
    
	return (
		<Fragment>
			<Grid item xs={12} sm={6}>
				<Field
					name={`communications.${index}.COMM_TYPE`}
					placeholder="Select Communication Type"
					options={listOfCommTypes}
					isLoading={loading}
					component={renderReactSelectField}
				/>
			</Grid>
			<UploadCommType index={index} {...selectedCommtype} />
		</Fragment>
	)
}

export default SelectCommType
