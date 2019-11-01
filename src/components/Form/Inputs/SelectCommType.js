import React, { useEffect, Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import { Field } from "formik"
import { renderReactSelectField } from "./renderInputs"
import UploadCommType from "../Upload/UploadCommType"
import { useQuery } from "@apollo/react-hooks"
import { GET_COMM_TYPES } from "graphql/ie/Queries"
import { getDistinctOptions } from "utils/selectUtil"

const SelectCommType = props => {
	const { loading, error, data } = useQuery(GET_COMM_TYPES)

    let listOfCommTypes = null   
	
	if (data.commtypes !== undefined) {
    
		 listOfCommTypes = getDistinctOptions(
			data.commtypes,
			"COMM_TYPE",
			"COMM_TYPE_DESC"
        )
        
    }
    
    

	return (
		<Fragment>
			<Grid item xs={12} sm={6}>
				<Field
					name={`communications.${props.index}.COMM_TYPE`}
					// value={COMM_TYPE}
					options={listOfCommTypes}
					isLoading={loading}
					component={renderReactSelectField}
				/>
			</Grid>
			{/* <UploadCommType {...props} /> */}
		</Fragment>
	)
}

export default SelectCommType
