import {createStore} from 'redux';

import rootReducer from './reducers/rootReducer';

/**
 * Create redux store that holds the app state.
 */

const store = createStore(rootReducer)


export default store;