import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_CANDIDATES = gql`
query {
    candidates {
      ELEC_SEAT_CAND_ID
    }
  }
`;


function Candidates({ onCandidateSelected }) {
    const { loading, error, data } = useQuery(GET_CANDIDATES);
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    //console.log(data)

    return (
      <select name="candidate" onChange={onCandidateSelected}>
        {data.candidates.map(candidate => (
          <option key={candidate.ELEC_SEAT_CAND_ID} value={candidate.ELEC_SEAT_CAND_ID}>
            {candidate.ELEC_SEAT_CAND_ID}
          </option>
        ))}
      </select>
    );
  }

export default Candidates