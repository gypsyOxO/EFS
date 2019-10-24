import React from "react"
import ReactSelect from "react-select"
import SimpleValue from "react-select-simple-value"

const ReactSelectV2 = ({ options, value, ...props }) => {

	return (
		<SimpleValue options={options} value={value}>
			{simpleProps => {                                
				simpleProps.value = simpleProps.value
					? simpleProps.value
					: null
                
                
				return (
					<ReactSelect
						{...simpleProps}
						{...props}
						className="basic-select"
						classNamePrefix="select"
					/>
				)
			}}
		</SimpleValue>
	)
}



// const ReactSelectV2 = ({ options, value, ...props }) => {

//     console.log("rsv2",props)
// 	return (
// 		<SimpleValue options={options} value={value}>
// 			{simpleProps => {
// 				simpleProps.value = simpleProps.value
// 					? simpleProps.value
// 					: null

// 				return (
// 					<ReactSelect
// 						{...simpleProps}
// 						{...props}
// 						className="basic-select"
// 						classNamePrefix="select"
// 					/>
// 				)
// 			}}
// 		</SimpleValue>
// 	)
// }

export const MultiSelect = ({ ...props }) => {
	return (
		<ReactSelect
			{...props}
			isMulti
			className="basic-multi-select"
			classNamePrefix="select"
		/>
	)
}

export default ReactSelectV2
