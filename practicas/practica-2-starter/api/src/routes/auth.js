import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

export function authRouter(controller) {
  const router = Router();
  router.post('/login', controller.login);
  router.get('/me', requireAuth, controller.me);
  return router;
}
