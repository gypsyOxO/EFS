import React from "react"
import { connect } from "react-redux"
import { getFormValues } from "redux-form"

const FormValues = ({ values }) => (
	<div>
        <hr />
        <h3>Form Values</h3>
		<font color="green" size="4">
			<code>
				<pre>
					{values ? JSON.stringify(values, 0, 2) : String(values)}
				</pre>
			</code>
		</font>
	</div>
)

export default connect(state => ({
	values: getFormValues("stepperForm")(state)
}))(FormValues)
