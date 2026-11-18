export function createItemsModel(db) {
  return {
    async list() { return (await db.query('SELECT id, name FROM items ORDER BY id')).rows; },
    async create(name, ownerId) { return (await db.query('INSERT INTO items (name, owner_id) VALUES ($1, $2) RETURNING id, name', [name, ownerId])).rows[0]; },
  };
}
