import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import * as authController from '../controllers/auth.controller.js'
import { authenticate, optionalAuthenticate } from '../middleware/auth.middleware.js'
import { validateBody } from '../middleware/validate.middleware.js'
import { signUpSchema, signInSchema } from '../validators/auth.validator.js'

const router = Router()

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
})

router.post(
  '/signup',
  authRateLimiter,
  validateBody(signUpSchema),
  authController.signUp,
)

router.post(
  '/signin',
  authRateLimiter,
  validateBody(signInSchema),
  authController.signIn,
)

router.post('/logout', optionalAuthenticate, authController.logout)
router.post('/refresh', authRateLimiter, authController.refresh)
router.get('/me', authenticate, authController.getMe)
router.get('/verify', authenticate, authController.verify)

export default router
