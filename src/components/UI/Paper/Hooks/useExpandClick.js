import React, { useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({

	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	}
}))

function useExpandClick(initialState) {
	const classes = useStyles()

    

	const [expanded, setExpanded] = useState(
		initialState && initialState.length
			? initialState.length === 1
				? [true]
				: [true, ...new Array(initialState.length - 1).fill(false, 0, initialState.length - 1)]
			: []
	)

	const handleExpandClick = index => {
		let newExpandList = [...new Array(initialState.length).fill(false, 0, initialState.length)]
		newExpandList.splice(index, 1, true)
		setExpanded(newExpandList)
	}

	const deleteItem = items => {
		items ? setExpanded([true, ...new Array(items.length).fill(false, 0, items.length)]) : setExpanded([true])
	}

	const addItem = items => {
		setExpanded([...new Array(items.length).fill(false, 0, items.length), true])
	}



	const ExpandButton = ({index}) => (
		<IconButton
			className={clsx(classes.expand, {
				[classes.expandOpen]: expanded[index]
			})}>
			<ExpandMoreIcon />
		</IconButton>
	)

	return [expanded, ExpandButton,{ handleExpandClick, deleteItem, addItem }]
}

export default useExpandClick
