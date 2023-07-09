import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { upload } from '../helper/helper.js';

const router = express.Router();

router.post('/register', upload.single('image'), registerUser);

export default router;
