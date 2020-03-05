import React from "react"


import { getMaxAmendment } from "./setUpAmendments"



let input
let output

beforeEach(() => {
    input = [{IE_ID: 6642, AMEND_NUM: 1, IE_STATUS_ID: 0},{IE_ID: 6643, AMEND_NUM: 2, IE_STATUS_ID: 0},{IE_ID: 6644, AMEND_NUM: 3, IE_STATUS_ID: 0}]
    output = [{IE_ID: 6644, AMEND_NUM: 3, IE_STATUS_ID: 0}]
})



describe("getMaxAmendments", () => {
	test("it should get the amendment with the highest value", () => {
		expect(getMaxAmendment(input)).toEqual(output)
	})
})
