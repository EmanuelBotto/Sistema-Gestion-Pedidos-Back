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
      'SELECT * FROM producto WHERE id = $1', [id]
    );
    return rows[0] || null;
  },

  async create({ nombre, descripcion, precio, estado, imagen }) {
    const { rows } = await pool.query(
      `INSERT INTO producto (nombre, descripcion, precio, estado, imagen)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion ?? null, precio, estado ?? 'activo', imagen ?? null]
    );
    return rows[0];
  },

  async update(id, { nombre, descripcion, precio, estado, imagen }) {
    const { rows } = await pool.query(
      `UPDATE producto
       SET nombre = $1, descripcion = $2, precio = $3, estado = $4, imagen = $5
       WHERE id = $6 RETURNING *`,
      [nombre, descripcion ?? null, precio, estado ?? 'activo', imagen ?? null, id]
    );
    return rows[0] || null;
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM producto WHERE id = $1 RETURNING *', [id]
    );
    return rows[0] || null;
  },
};

export default ProductoModel;
