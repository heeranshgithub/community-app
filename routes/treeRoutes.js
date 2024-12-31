import express from 'express'
import { getTree } from '../controllers/treeController.js'

const router = express.Router()

router.route('/tree').get(getTree)

export default router
