import pool from "../config/bd.js";

const DetallePedidoModel = {
    async getAll() {
        const { rows } = await pool.query (
            "SELECT * FROM detalle_pedido ORDER BY id ASC"
        );
        return rows;
    },

    async getById(id) {
        const { rows } = await pool.query (
            "SELECT * FROM detalle_pedido WHERE id = $1",
            [id]
        );
        return rows[0] || null;
    },

    async create({ cantidad, precio_unitario, pedido, producto }) {
        const { rows } = await pool.query(
            `INSERT INTO detalle_pedido (cantidad, precio_unitario, pedido, producto) 
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [cantidad, precio_unitario, pedido, producto]
        );
        return rows[0];
    },

    async update(id, { cantidad, precio_unitario, pedido, producto }) {
        const { rows } = await pool.query(
            `UPDATE detalle_pedido
            SET cantidad = $1, precio_unitario = $2, pedido = $3, producto = $4
            WHERE id = $5
            RETURNING *`,
            [cantidad, precio_unitario, pedido, producto, id]
        );
        return rows[0] || null;
    },

    async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM detalle_pedido WHERE id = $1 RETURNING *',
            [id]
        );
        return rows[0] || null;
    },
};

export default DetallePedidoModel;