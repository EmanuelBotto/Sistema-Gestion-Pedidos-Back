import pool from "../config/bd.js";

const PedidoModel = {
  async getAll() {
    const { rows } = await pool.query(
      "SELECT * FROM pedido ORDER BY id ASC"
    );
    return rows;
  },

  // Filtra pedidos por cliente_id — usado cuando el rol es "cliente"
  async getByClienteId(cliente_id) {
    const { rows } = await pool.query(
      "SELECT * FROM pedido WHERE cliente_id = $1 ORDER BY id ASC",
      [cliente_id]
    );
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      "SELECT * FROM pedido WHERE id = $1", [id]
    );
    return rows[0] || null;
  },

  async create({ cliente_id, estado }) {
    const { rows } = await pool.query(
      `INSERT INTO pedido (cliente_id, estado)
       VALUES ($1, $2) RETURNING *`,
      [cliente_id, estado ?? "pendiente"]
    );
    return rows[0];
  },

  async update(id, { estado }) {
    const { rows } = await pool.query(
      "UPDATE pedido SET estado = $1 WHERE id = $2 RETURNING *",
      [estado, id]
    );
    return rows[0] || null;
  },

  async delete(id) {
    const { rows } = await pool.query(
      "DELETE FROM pedido WHERE id = $1 RETURNING *", [id]
    );
    return rows[0] || null;
  },
};

export default PedidoModel;