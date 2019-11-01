import React, { useCallback } from "react";
//import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button"
import {SINGLE_FILE_UPLOAD} from "graphql/ie/Mutations"
import Grid from "@material-ui/core/Grid"
//import { filesQuery } from "./Files";


export const Upload = () => {
    const [uploadFileMutation] = useMutation(SINGLE_FILE_UPLOAD)
    //const apolloClient = useApolloClient()
  
    const onChange = ({
      target: {
        validity,
        files: [file]
      }
    }) =>
      validity.valid &&
      uploadFileMutation({ variables: { file } }).then(() => {
        //apolloClient.resetStore()
        //could get file attributes here and set field value accordingly.
        console.log(file)

      })
  
      return <Button variant="contained" component="label">
      Upload File
      <input
          onChange={onChange
              
            
        //     event => {
        //       console.log(index)
        //       //{`communications.${index}.file`}
        //       return setFieldValue(
        //           `communications.${index}.Audio_File_Name`,
        //           event.currentTarget.files[0]
        //       )
        //   }
        }
          type="file"
          style={{ display: "none" }}
      />
  </Button>	
  }

								
						






// export const Upload = props => {
//   const [uploadFile] = useMutation(uploadFileMutation, {
//     refetchQueries: [{ query: filesQuery }]
//   });
//   const onDrop = useCallback(
//     ([file]) => {
//       uploadFile({ variables: { file } });
//     },
//     [uploadFile]
//   );
  
  
//   return (
//   <div>
//   <input
//       onChange={event => {
//           console.log(onDrop)
          
//           //{`communications.${index}.file`}
//           return props.setFieldValue(
//               "file",
//               event.currentTarget.files[0]
//           )
//       }}
//       type="file"
      
//   />
//       </div>
//   )}


  
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//     </div>
//   );
// };