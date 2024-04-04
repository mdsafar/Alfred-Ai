import express from 'express'
import { aiQuestion, deleteChatRoom, getAllChatRooms, getAllChats } from '../Controllers/aiController.js'
import { verifyUser } from '../MiddleWares/authMiddleware.js'

const router =  express.Router()

router.route('/question').post(aiQuestion)
router.route('/get-chatRooms').get(verifyUser,getAllChatRooms)
router.route('/get-chats/:chatId').get(verifyUser,getAllChats)
router.route('/delete-chatRoom/:chatId').delete(verifyUser,deleteChatRoom)



export default router