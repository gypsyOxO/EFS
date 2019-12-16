import React from "react"

import { addEventListener } from "consolidated-events"

const defaultProps = {
	// `useCapture` is set to true by default so that a `stopPropagation` in the
	// children will not prevent all outside click handlers from firing - maja
	useCapture: true
}

export default class OnChangeHandler extends React.Component {
	constructor(...args) {
		super(...args)

		this.onChange = this.onChange.bind(this)
		this.element = React.createRef()
	}

	componentDidMount() {
		const { useCapture } = this.props

		this.removeOnChange = addEventListener(
			this.element.current,
			"change",
			this.onChange,
			{ capture: useCapture }
		)
	}

	componentWillUnmount() {
		if (this.removeOnChange) this.removeOnChange()
	}

	onChange(e) {
		this.props.handleChange()
	}

	render() {
		const { children} = this.props

		return <div ref={this.element}>{children}</div>
	}
}

OnChangeHandler.defaultProps = defaultProps
