import { Router } from 'express';
import { addComment, getAllComments } from '../controllers/commentController.js';

const router = Router();

router.get('/getComments', getAllComments);
router.post('/addComment', addComment);

export default router;

