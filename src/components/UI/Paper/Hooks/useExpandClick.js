import React, { useState,useCallback } from "react"
import IconButton from "@material-ui/core/IconButton"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"
//update folder

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

export default function useExpandClick(initialState) {
	

	const [expanded, setExpanded] = useState(
		initialState && initialState.length
			? [...new Array(initialState.length).fill(false, 0, initialState.length)] : []
    )

    
    // const [count, setCount] = useState(0)
    // const increment = useCallback(() => setCount((x) => x + 1), [])
    
    
	const handleExpandClick = index => {
		let newExpandList = [...new Array(initialState.length).fill(false, 0, initialState.length)]
		newExpandList.splice(index, 1, !expanded[index])
		setExpanded(newExpandList)
	}

	const deleteItem = (index) => {        
        let newExpandList = []

        if(expanded.length > 1) {
            newExpandList = [...expanded]
            newExpandList.splice(index,1)            
        }

        setExpanded(newExpandList)
    }
    
	const addItem = () => {        
		setExpanded([...new Array(expanded.length).fill(false, 0, expanded.length), true])
	}

	const ExpandButton = ({index, onClick}) => {
        
        const classes = useStyles()
        return (        
		<IconButton onClick={onClick}
			className={clsx(classes.expand, {
				[classes.expandOpen]: expanded[index]
			})}>
			<ExpandMoreIcon />
		</IconButton>
	)}

    return {expanded, ExpandButton, handleExpandClick, deleteItem, addItem }
    
}


