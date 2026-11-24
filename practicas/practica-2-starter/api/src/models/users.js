export function createUsersModel(db) {
  return {
    async findByEmail(email) {
      const result = await db.query('SELECT id, email, password_hash FROM users WHERE email = $1', [
        email,
      ]);
      return result.rows[0];
    },
  };
}
