import express from 'express';
import rateLimiter from 'express-rate-limit';
import { login, register } from '../controllers/userController.js';

const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 mins (ms: milliseconds)
  max: 10,
  message: 'Too many requests, please try again later.',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);

export default router;
