import axios from "axios";
import { ALL_CHATROOMS_FAIL, ALL_CHATROOMS_REQUEST, ALL_CHATROOMS_SUCCESS, ASK_QUESTION_REQUEST, ASK_QUESTION_SUCCESS, DELETE_CHATROOM_FAIL, DELETE_CHATROOM_REQUEST, DELETE_CHATROOM_SUCCESS, GET_CHATS_FAIL, GET_CHATS_REQUEST, GET_CHATS_SUCCESS } from "../constants/chatConstants";

const url = 'http://localhost:4000/api/v1'

export const getAllChatRooms = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CHATROOMS_REQUEST })

        await axios.get(`${url}/get-chatRooms`, { withCredentials: true }).then((response) => {
            dispatch({ type: ALL_CHATROOMS_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: ALL_CHATROOMS_FAIL, payload: err.response.data.message })
    }
}

export const getChats = (chatId) => async (dispatch) => {
    try {
        dispatch({ type: GET_CHATS_REQUEST })

        await axios.get(`${url}/get-chats/${chatId}`, { withCredentials: true }).then((response) => {
            dispatch({ type: GET_CHATS_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: GET_CHATS_FAIL, payload: err.response.data.message })
    }
}


export const createRoom = (prompt, navigate, results, setResults, userId) => async (dispatch) => {
    try {

        dispatch({ type: ASK_QUESTION_REQUEST })

        const chatId = ''
        const response = await axios.post(`${url}/question`, { prompt, chatId, results, userId }, { withCredentials: true })
        dispatch({ type: ASK_QUESTION_SUCCESS })
        response.data.text && setResults(p => [...p, { role: 'model', parts: response.data.text }])
        if (response.data.chatId) {
            setTimeout(() => {
                navigate(`a/${response.data.chatId}`)
            }, 1000)
        }

    } catch (err) {
        dispatch({ type: ASK_QUESTION_REQUEST, payload: err.response.data.message })
        console.log(err);
    }
}

export const askQuestion = (prompt, chatId, setResults, userId) => async (dispatch) => {
    try {
        dispatch({ type: ASK_QUESTION_REQUEST })

        await axios.post(`${url}/question`, { prompt, chatId, userId }, { withCredentials: true }).then((response) => {
            dispatch({ type: ASK_QUESTION_SUCCESS })
            setResults(p => [...p, { role: 'model', parts: response.data.text }])
        })

    } catch (err) {
        dispatch({ type: ASK_QUESTION_REQUEST, payload: err.response.data.message })
        console.log(err);
    }
}


export const deleteChatRoom = (chatId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CHATROOM_REQUEST })

        await axios.delete(`${url}/delete-chatRoom/${chatId}`, { withCredentials: true }).then((response) => {
            dispatch({ type: DELETE_CHATROOM_SUCCESS, payload: response.data.success })
        })

    } catch (err) {
        dispatch({ type: DELETE_CHATROOM_FAIL, payload: err.response.data.message })
    }
}
