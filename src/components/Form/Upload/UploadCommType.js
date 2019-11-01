import React from "react"
import Grid from "@material-ui/core/Grid"

//TODO add loop through existing comm types

function handleUploadField(commType) {
    const uploadButtonList = ""

    return uploadButtonList

}
    

const UploadCommType = props => {

    const commTypes = ["doc","video","audio"]

    //TODO: loop through commtypes and check for existence. if so add it as a button. 

	return (
		<div>            
			<Grid item xs={12}>
                {/* Hnadle field values */}
				{/* <Upload setFieldValue={setFieldValue} /> */}
			</Grid>
		</div>
	)
}

export default UploadCommType
