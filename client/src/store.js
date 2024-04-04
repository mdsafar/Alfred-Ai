import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { ChatRoomsReducer, askQuestionReducer, chatsReducer } from './reducers/chatReducer'
import { userReducer } from './reducers/userReducer'


const reducer = combineReducers({
    user:userReducer,
    chatRooms:ChatRoomsReducer,
    chats:chatsReducer,
    askQuestion:askQuestionReducer
})

const middleware = [thunk]

const store = createStore(reducer, applyMiddleware(...middleware))

export default store