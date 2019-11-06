import React, { Fragment } from "react"
import { useMutation} from "@apollo/react-hooks"
import Button from "@material-ui/core/Button"
import { SINGLE_FILE_UPLOAD } from "graphql/ie/Mutations"
import { useFormikContext } from "formik"
import {convertToDotNotation} from "utils/stringUtil"

const Upload = props => {
	const [uploadFileMutation] = useMutation(SINGLE_FILE_UPLOAD)
	const { setFieldValue, values } = useFormikContext()
    const { index, fieldType, fileTypes } = props
    
    const chosenFileName = fieldType + "_FILE_NAME" in values.communications[index] ? values.communications[index][fieldType + '_FILE_NAME'] : "No file chosen"

	const onChange = ({
		target: {
			validity,
			files: [file]
		}
	}) =>
		validity.valid &&
		uploadFileMutation({ variables: { file } }).then(() => {

			setFieldValue(
				`communications.${index}.${fieldType}_FILE_NAME`,
				file.name
			)
		})

	return (
		<Fragment>
			<Button variant="contained" component="label">
				Upload {fileTypes.replace(",", " or ")} File
				<input
					onChange={onChange}
					type="file"
                    style={{ display: "none" }}
                    accept={convertToDotNotation(fileTypes)}
				/>
			</Button>
            &nbsp; {chosenFileName}
		</Fragment>
	)
}

export default Upload

