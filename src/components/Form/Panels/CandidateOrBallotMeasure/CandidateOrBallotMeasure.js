import React, {Component} from 'react'
import Candidate from '../../Group/Candidate/Candidate'


//need to take in initialization value. also needs to pass on selected props. spinner happens at candidate or ballot measure level?

class CandidateOrBallotMeasure extends Component {
    state = {
        isCandidate: true
    }
    //if is Candidate show candidate prop, else, show ballotmeasure. But handle loading. 


    render() {
        return (
            //have radio button here
            //which switches between candidate or ballot measure. could be a function maybe? but needs state
            // <Candidate {...this.props} />
            <Candidate />

        )
    }
}
  
    

export default CandidateOrBallotMeasure