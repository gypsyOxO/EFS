import React, { Fragment } from "react"
import { useMutation } from "@apollo/react-hooks"
import Button from "@material-ui/core/Button"
import { SINGLE_FILE_UPLOAD } from "graphql/ie/Mutations"
import { useFormikContext } from "formik"
import { convertToDotNotation } from "utils/stringUtil"

const Upload = props => {
	const [uploadFileMutation] = useMutation(SINGLE_FILE_UPLOAD)
	const { setFieldValue, values } = useFormikContext()
	const { index, fieldType, fileTypes } = props

	const displayFileName =
        values.comms[index][fieldType + "_FILE_NAME"]             
            //converts modified filename to original filename. eg. test_1034.pdf = test.pdf. Used solely for display purposes.
			? values.comms[index][fieldType + "_FILE_NAME"].replace("__" + values.comms[index].IE_COMM_ID.toString(), "")
			: "No file chosen"

	const onChange = ({
		target: {
			validity,
			files: [file]
		}
	}) => {
		if (validity.valid) {
			//adds ie_comm_id to filenames with single and multiple "." in them. eg. test.pdf and test.bak.pdf become test_1044.pdf and test.bak_1044.pdf respectively
			const modifiedFileName = file.name
				.substring(0, file.name.lastIndexOf("."))
				.concat("__", values.comms[index].IE_COMM_ID.toString(), ".", file.name.split(".").slice(-1))

			const meta = {
				FILE_TYPE: fieldType,
				MODIFIED_FILE_NAME: modifiedFileName
			}

			uploadFileMutation({ variables: { file, meta: meta } }).then(() => {
				setFieldValue(`comms.${index}.${fieldType}_FILE_NAME`, modifiedFileName)
			})
		}
	}

	return (
		<Fragment>
			<Button variant="contained" component="label">
				Upload {fileTypes.replace(",", " or ")} File
				<input onChange={onChange} type="file" style={{ display: "none" }} accept={convertToDotNotation(fileTypes)} />
			</Button>
			&nbsp; {displayFileName}
		</Fragment>
	)
}

export default Upload
