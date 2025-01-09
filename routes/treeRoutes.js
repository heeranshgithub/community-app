import express from 'express'
import { getTree } from '../controllers/treeController.js'
import authenticateUser from '../middlewares/auth.js'

const router = express.Router()

router.route('/:id').get(authenticateUser, getTree)

export default router
