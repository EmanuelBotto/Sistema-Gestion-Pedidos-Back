import pool from "../config/bd.js";

const createCliente = async (nombre, mail, telefono, direccion, empresa, pedidos) => {
    const resultado = await pool.query (
        `INSERT INTO cliente (nombre, mail, telefono, direccion, empresa, pedidos)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [nombre, mail, telefono, direccion, empresa, pedidos]
    );
    return resultado.rows[0];
};

const getCliente = async () => {
    const resultado = await pool.query (
        "SELECT * FROM cliente ORDER BY id DESC"
    );
    return resultado.rows;
};

const getClienteById = async (id) => {
    const resultado = await pool.query (
        "SELECT * FROM cliente WHERE id = $1",
        [id]
    );
    return resultado.rows[0];
};

const updateUsuario = async (id, nombre, mail, telefono, direccion, empresa, pedidos) => {
    const resultado = await pool.query (
        `UPDATE cliente
        SET nombre = $1, mail = $2, telefono = $3, direccion = $4, empresa = $5, pedidos = $6
        WHERE id = $7
        RETURNING *`,
        [nombre, mail, telefono, direccion, empresa, pedidos, id]
    );
    return resultado.rows[0];
};

const deleteCliente = async (id) => {
    const resultado = await pool.query (
        "DELETE FROM cliente WHERE id = $1",
        [id]
    );
};