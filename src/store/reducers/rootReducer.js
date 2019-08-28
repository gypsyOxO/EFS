
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';


const rootReducer = combineReducers({
    form: formReducer  // ← redux-form
});

export default rootReducer;