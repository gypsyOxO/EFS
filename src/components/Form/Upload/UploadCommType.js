import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"

import Upload from "./Upload"


const UploadCommType = props => {
	const commTypes = ["DOC", "VIDEO", "AUDIO"]
	const { index } = props
	

	const displayUploadButtons =
		"COMM_TYPE" in props  //Show upload buttons only if COMM_TYPE has been selected
			? commTypes.map(fieldType => {
                    const fileTypes = props[fieldType + "_FILE_TYPES"]  //e.g. AUDIO_FILE_TYPES = "MP3, WAV", DOC_FILE_TYPES="PDF", or DOC_FILE_TYPES=null
					if (fileTypes) {   //e.g if AUDIO_FILE_TYPES or other file_types is not null, display upload button
						return (
							<Grid key={fieldType} item xs={12}>
								<Upload index={index} fieldType={fieldType} fileTypes={fileTypes}/>
							</Grid>
                        )
                    } else {
                        return null
                    }
			  })
			: null

	return (
		<Fragment>
			{displayUploadButtons}
		</Fragment>
	)
}

export default UploadCommType
