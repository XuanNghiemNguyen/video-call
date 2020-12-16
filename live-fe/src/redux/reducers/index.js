import { combineReducers } from 'redux'
import chat from './chat'
import user from './user'
import friends from './friends'
import messages from './messages'

const myReducer = combineReducers({
    // chat,
    user,
    friends,
    messages
});

export default myReducer;