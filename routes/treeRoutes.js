import express from 'express';
import { getTree, postTree } from '../controllers/treeController.js';

const router = express.Router();

router.route('/:treeId').get(getTree);
router.route('/').post(postTree);

export default router;
