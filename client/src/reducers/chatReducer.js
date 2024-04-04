import { ALL_CHATROOMS_FAIL, ALL_CHATROOMS_REQUEST, ALL_CHATROOMS_SUCCESS, ASK_QUESTION_FAIL, ASK_QUESTION_REQUEST, ASK_QUESTION_SUCCESS, DELETE_CHATROOM_FAIL, DELETE_CHATROOM_REQUEST, DELETE_CHATROOM_SUCCESS, GET_CHATS_FAIL, GET_CHATS_REQUEST, GET_CHATS_SUCCESS } from "../constants/chatConstants";


export const ChatRoomsReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CHATROOMS_REQUEST:
        case DELETE_CHATROOM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_CHATROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                chatRooms: action.payload
            }
        case DELETE_CHATROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case ALL_CHATROOMS_FAIL:
        case DELETE_CHATROOM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const chatsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CHATS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload
            }
        case GET_CHATS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const askQuestionReducer = (state = {}, action) => {
    switch (action.type) {
        case ASK_QUESTION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ASK_QUESTION_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case ASK_QUESTION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}