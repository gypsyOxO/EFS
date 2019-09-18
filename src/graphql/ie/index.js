import {gql} from "apollo-boost"


export const GET_IND_EXP = gql`
query {
  t1(IE_ID: 642) {
    SUPPORT_OPPOSE_FLG
    CAND_PER_ID
    comms {
      COMM_TYPE
      DOC_FILE_NAME
    }    
  }
}
`


// export const SUBMIT_IND_EXP = gql`
// mutation 
// `
