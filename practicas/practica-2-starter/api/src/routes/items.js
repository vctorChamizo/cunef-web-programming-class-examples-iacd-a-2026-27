import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validateItem } from '../validators/items.js';
export function itemsRouter(controller) {
  const router = Router();
  router.get('/', controller.list);
  router.post('/', requireAuth, validateItem, controller.create);
  return router;
}
