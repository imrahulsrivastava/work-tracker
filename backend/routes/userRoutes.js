import express from 'express';
import { loginUser, register } from '../controllers/userControllers.js';

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(loginUser);



export default router;