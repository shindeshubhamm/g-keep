import { combineReducers } from 'redux';

import appReducer from './appReducer';
import notesReducer from './notesReducer';

export default combineReducers({
    app: appReducer,
    notes: notesReducer,
});
