import { registerUser,verifyEmail,login} from '../controllers/auth.js'
import express from 'express'

const router = express.Router()


router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify/:id/:token', verifyEmail);

export default router;