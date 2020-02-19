export {default as Page1} from "./Page1"
export {default as Page2} from "./Page2"
export {default as Page3} from "./Page3"
export {default as Page4} from "./Page4"
export {default as Page5} from "./Page5"
export {default as Review} from "./Review"



/****************************/
//App variables and content
/****************************/

//used to help convert numeric values in fields to null on filtered graphql queries
export const numeric_fields = ["NUM_DISTRIBUTED","ELECTION_ID","ELEC_SEAT_ID", "ELEC_SEAT_CAND_ID","BM_ID"]

export const commTypes = ["DOC", "VIDEO", "AUDIO"]

/************ disclaimers *********/

/* These disclaimers are used per communication type on communication tab */
export const disclaimers = [
    {name: "required", description: "I am aware that required PDF file of communication has not been uploaded and this report must be amended to include the PDF within one business day after it becomes available.", value: false, isRequired: true, comm_file_type: ["DOC"]},
    {name: "required", description: "I am aware that required audio file (MP3,WAV) or script file (PDF) has not been uploaded and this report must be amended to include both files within one business day after they become available.", value: false, isRequired: true, comm_file_type: ["AUDIO"]},
    {name: "required", description: "I am aware that required video file (MP4) or script file (PDF) has not been uploaded and this report must be amended to include both files within one business day after they become available.", value: false, isRequired: true, comm_file_type: ["VIDEO"]},

    {name: "color_original", description: " I affirm that uploaded PDF file is a color original.", value: false, isRequired: false, comm_file_type: ["DOC"]},

    {name: "language", description: "I affirm that communication includes all mandatory disclaimer language.", value: false, isRequired: false, comm_file_type: ["DOC","AUDIO","VIDEO"]},
    
    {name: "funding_names", description: "I affirm that communication includes all major funding names.", value: false, isRequired: false, comm_file_type: ["DOC","AUDIO","VIDEO"]}   
]

/* These discaimers are for each page */
export const disclaimer_comm = "I am not uploading required communication files at this time and am aware I must amend in one business day to add them."
export const disclaimer_cont_made = "I did not make any contributions of $100 or more since my last report."
export const disclaimer_cont_rec = "I did not receive any contributions of $100 or more since my last report."



/**********************************/
//Instructional content on pages
/**********************************/

export const purpose_box = "A separate notification must be filed for each communication. If the communication supports or opposes more than one candidate or ballot measure, then separate notifications must be filed for each candidate or ballot measure, and the spending amounts, reported in the Spending Information section must be apportioned among them."

export const communications_box = "A digital copy of the communication must be filed with this notification. Los Angeles Charter \u00A7 803(s)(2) specifies the types of copies that must be filed. If the communication file(s) are not available when this notification must be filed, this report must be amended to include the communication file(s)  within one business day after they become available."

export const spendinginfo_box = "Identify the amount of spending per payee that was made or incurred for [the candidate or ballot measure you are supporting or opposing]. If the communication supports or opposes more than one candidate or ballot measure, then apportion an equal amount in each separate notification filed."

export const contributions_made_box = "Persons making independent expenditure communications to support or oppose a candidate or ballot measure are required to disclose all contributions of $100 or more that they made to any candidate in the current calendar year."

export const contributions_received_box = "Committees must report information about contributions of $100 or more that they recieved since their most recent campaign statement or the first day of the calendar year, whichever is later. This does not apply to contributions earmarked for non-[LAUSD/City] purposes."

export const review_box = "Please review the information you have entered. If you need to make changes, click the red pencil icon to edit. Once you have made any necessary changes, click the CONTINUE TO E-SIGN button."