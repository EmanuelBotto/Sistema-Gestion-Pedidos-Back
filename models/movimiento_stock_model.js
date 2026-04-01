import pool from "../config/bd.js";

const MovimientoStockModel = {
  async getAll() {
    const { rows } = await pool.query(
      `SELECT ms.*, u.nombre AS usuario_nombre
       FROM movimiento_stock ms
       JOIN usuario u ON u.id = ms.usuario_realizo_movimiento
       ORDER BY ms.id ASC`
    );
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      `SELECT ms.*, u.nombre AS usuario_nombre
       FROM movimiento_stock ms
       JOIN usuario u ON u.id = ms.usuario_realizo_movimiento
       WHERE ms.id = $1`,
      [id]
    );
    return rows[0] || null;
  },

  async create({ producto_id, tipo, cantidad, usuario_realizo_movimiento }) {
    const { rows } = await pool.query(
      `INSERT INTO movimiento_stock (producto_id, tipo, cantidad, usuario_realizo_movimiento)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [producto_id, tipo, cantidad, usuario_realizo_movimiento]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM movimiento_stock WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0] || null;
  },
};

export default MovimientoStockModel;