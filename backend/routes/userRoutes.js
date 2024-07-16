import express from 'express';
import { register } from '../controllers/userControllers';

const router = express.Router();

router.route('/api/v1/register').post(register);