import gql from "graphql-tag"

export const ADD_IE = gql`
	mutation CreateIE($ie: IECreate!) {
		createIE(ie: $ie) {
			IE_ID
		}
	}
`

export const UPDATE_IE = gql`
	mutation updateIE($ie: IEUpdate!) {
		updateIE(ie: $ie)
	}
`
