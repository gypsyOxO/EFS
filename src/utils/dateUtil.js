export function convertISODateToJsDate(inputDate) {
	var date = new Date(inputDate)
	if (!isNaN(date.getTime())) {
		var day = date.getDate().toString()
		var month = (date.getMonth() + 1).toString()
		// Months use 0 index.

		return (month[1] ? month : "0" + month[0]) + "/" + (day[1] ? day : "0" + day[0]) + "/" + date.getFullYear()
	}
}
