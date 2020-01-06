
import graphql from "graphql-anywhere"
import {numeric_fields} from "views/ie/Wizard"


const resolver = (fieldName, root) => root[fieldName];


export function graphqlFilter (gql,data) {

    //numeric data coming from formik with empty string is converted to a null value
    for (var fieldName of numeric_fields) {
        data[fieldName] = data[fieldName] ? data[fieldName] : null
    } 

    const result = graphql(
        resolver,
        gql,
        data
    )

    return result
}