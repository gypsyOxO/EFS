export {default as Page1} from "./Page1"
export {default as Page2} from "./Page2"
export {default as Page3} from "./Page3"
export {default as Page4} from "./Page4"
export {default as Page5} from "./Page5"
export {default as Review} from "./Review"


//used to help convert numeric values in fields to null on filtered graphql queries
export const numeric_fields = ["NUM_DISTRIBUTED","ELECTION_ID","ELEC_SEAT_ID", "ELEC_SEAT_CAND_ID","BM_ID"]

export const communications_box = "A separate form is required for each communication. If the communication supports or opposes more than one candidate, separate forms must also be filed for each candidate, and the spending amounts, reported in the payments section must be apportioned among them. A copy of the communication must also be attached to this form. Los Angeles Charter &sect; 803(s)(2) specifies the types of copies that must be filed. If the communication is not available when this form must be filed, the form must be amended to include the communication within one business day after the communication becomes available."

export const payment_box = "Identify the amount of spending per payee that was made or incurred for the candidate identified in the first step labeled purpose."

export const contributions_made_box = "Persons making independent expenditure communications to support or oppose an LAUSD candidate are required to disclose all contributions of $100 or more that they made to any LAUSD candidate in the current calendar year."

export const contributions_received_box = "Committees must report information about contributions of $100 or more that they recieved since their most recent campaign statement or the first day of the calendar year, whichever is later. THis does not apply to contributions earmarked for non-LAUSD purposes."



export const review_box = "This communication has been submitted for your approval. If any incorrect selections exist simply click on the red icon for what you want fixed.  YOU WILL NOT BE PENALIZED!!!."