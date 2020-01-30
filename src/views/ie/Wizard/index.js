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

export const disclaimers = [
    {name: "required", description: "I am aware that required communication file(s) (audio/video/pdf)  have not been uploaded.", value: false, isRequired: true},
    {name: "color_original", description: " I affirm that communication file(s) (audio/video/pdf) are color originals.", value: false, isRequired: false},
    {name: "language", description: "I affirm that communication  file(s) (audio/video/pdf)  include all mandatory disclaimer language is included.", value: false, isRequired: false},
    {name: "funding_names", description: "I affirm that communication  file(s) (audio/video/pdf)  include all major funding names.", value: false, isRequired: false},
        
]
    



/**********************************/
//Instructional content on pages
/**********************************/

export const purpose_box = "A separate notification must be filed for each communication. If the communication supports or opposes more than one candidate or ballot measure, then separate notifications must be filed for each candidate or ballot measure, and the spending amounts, reported in the Spending Information section must be apportioned among them."

export const communications_box = "A digital copy of the communication must be filed with this notification. Los Angeles Charter \u00A7 803(s)(2) specifies the types of copies that must be filed. If the communication file is not available when this notification must be filed, the notification must be amended to include the communication within one business day after the communication becomes available."

export const spendinginfo_box = "Identify the amount of spending per payee that was made or incurred for [the candidate or ballot measure you are supporting or opposing]. If the communication supports or opposes more than one candidate or ballot measure, then apportion an equal amount in each separate notification filed."

export const contributions_made_box = "Persons making independent expenditure communications to support or oppose a candidate or ballot measure are required to disclose all contributions of $100 or more that they made to any candidate in the current calendar year."

export const contributions_received_box = "Committees must report information about contributions of $100 or more that they recieved since their most recent campaign statement or the first day of the calendar year, whichever is later. This does not apply to contributions earmarked for non-[LAUSD/City] purposes."

export const review_box = "Please review the information you have entered. If you need to make changes, click the red pencil icon to edit. Once you have made any necessary changes, click the CONTINUE TO E-SIGN button."