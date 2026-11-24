export function createItemsController(model) {
  return {
    async list(req, res) {
      const items = await model.list();
      res.json(items);
    },

    async create(req, res) {
      // req.validated lo deja validateItem; req.user, requireAuth.
      const item = await model.create(req.validated.name, req.user.id);
      res.status(201).json(item);
    },
  };
}
