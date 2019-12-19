
import graphql from "graphql-anywhere"



const resolver = (fieldName, root) => root[fieldName];

export function graphqlFilter (gql,data) {

    const result = graphql(
        resolver,
        gql,
        data
    )

    return result
}