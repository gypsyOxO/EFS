import React from "react"
import { shallow } from "enzyme"
import { renderReactSelectField, renderDatePicker, renderTextField, renderCheckbox, renderRadioGroup } from "../renderInputs"

describe("renderInputs", () => {
	it('renders renderReactSelectField', () => {
		const component = shallow(<renderReactSelectField />)
		expect(component).toMatchSnapshot()
	})
})


describe("renderInputs", () => {
	it('renders renderDatePicker', () => {
		const component = shallow(<renderDatePicker />)
		expect(component).toMatchSnapshot()
	})
})

describe("renderInputs", () => {
	it('renders renderTextField', () => {
		const component = shallow(<renderTextField />)
		expect(component).toMatchSnapshot()
	})
})

describe("renderInputs", () => {
	it('renders renderCheckbox', () => {
		const component = shallow(<renderCheckbox />)
		expect(component).toMatchSnapshot()
	})
})

describe("renderInputs", () => {
	it('renders renderRadioGroup', () => {
		const component = shallow(<renderRadioGroup />)
		expect(component).toMatchSnapshot()
	})
})

