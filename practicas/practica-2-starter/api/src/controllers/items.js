export function createItemsController(model) {
  return {
    async list(req, res) { res.json(await model.list()); },
    async create(req, res) { res.status(201).json(await model.create(req.validated.name, req.user.id)); },
  };
}
