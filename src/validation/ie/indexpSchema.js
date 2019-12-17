import * as Yup from "yup";

export const indexpSchema = Yup.object().shape({
	
    SUPPORT_OPPOSE_FLG: Yup.string().required("You must choose one"),
    SUBJECT: Yup.string().required("You must choose one"),
	MC_FLG: Yup.string().required("You must choose one"),
    DATE_DISTRIBUTED: Yup.string().required("Required"),
    // payments: Yup.array().of(
    //     Yup.object().shape({
    //         IE_PAYMENT_DATE: Yup.string().required("Required"),
    //         IE_PAYMENT_AMT: Yup.string().required("Required"),
    //         IE_PAYEE: Yup.string().required("Required"),
    //         IE_PAYMENT_DESC: Yup.string().required("Required")
    //     })

    // )

});


export const Page1 = ["SUPPORT_OPPOSE_FLG","MC_FLG","SUBJECT"];
export const Page2 = [];
export const Page3 = [];
export const Page4 = [];
export const Page5 = [];



//Field group validations page1

//export const page1 = 

