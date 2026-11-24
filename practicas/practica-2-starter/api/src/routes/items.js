import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validateItem } from '../validators/items.js';

export function itemsRouter(controller) {
  const router = Router();
  router.get('/', controller.list);
  // requireAuth va antes que validateItem: una petición sin sesión recibe 401
  // sin llegar a validar el cuerpo.
  router.post('/', requireAuth, validateItem, controller.create);
  return router;
}
