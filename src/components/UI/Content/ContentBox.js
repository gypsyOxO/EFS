import React from 'react'
import Box from '@material-ui/core/Box'

const ContentBox = props => (
    <Box border="1px solid" borderColor="grey.500" m={2} py={1} px={2}>
        {props.children}
    </Box>
)

export default ContentBox