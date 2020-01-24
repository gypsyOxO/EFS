export const jumpLink = (document_id,elec_signature_flg) => {
    window.location.href = process.env.REACT_APP_DOMAIN + process.env.REACT_APP_JUMPLINK_PATH + "?elec_signature_flg=" + elec_signature_flg + "&id=" + document_id
}

