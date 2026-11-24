export function createItemsModel(db) {
  return {
    async list() {
      const result = await db.query('SELECT id, name FROM items ORDER BY id');
      return result.rows;
    },

    async create(name, ownerId) {
      const result = await db.query(
        'INSERT INTO items (name, owner_id) VALUES ($1, $2) RETURNING id, name',
        [name, ownerId],
      );
      return result.rows[0];
    },
  };
}
