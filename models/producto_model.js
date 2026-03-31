import pool from "../config/bd.js";

const ProductoModel = {
  async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM producto ORDER BY id ASC'
    );
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM producto WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  },

  async create({ nombre, descripcion, precio, estado }) {
    const { rows } = await pool.query(
      `INSERT INTO producto (nombre, descripcion, precio, estado)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, descripcion ?? null, precio, estado ?? 'activo']
    );
    return rows[0];
  },

  async update(id, { nombre, descripcion, precio, estado }) {
    const { rows } = await pool.query(
      `UPDATE producto
       SET nombre = $1, descripcion = $2, precio = $3, estado = $4
       WHERE id = $5
       RETURNING *`,
      [nombre, descripcion ?? null, precio, estado ?? 'activo', id]
    );
    return rows[0] || null;
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM producto WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0] || null;
  },
};

export default ProductoModel;