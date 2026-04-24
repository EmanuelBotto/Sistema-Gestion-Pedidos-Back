import pool from "../config/bd.js";

export const getCliente = async () => {
    const { rows } = await pool.query("SELECT * FROM cliente ORDER BY id DESC");
    return rows;
};

export const getClienteById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM cliente WHERE id = $1", [id]);
    return rows[0];
};

export const getClienteByMail = async (mail) => {
    const { rows } = await pool.query(
        "SELECT * FROM cliente WHERE LOWER(mail) = LOWER($1) LIMIT 1",
        [mail]
    );
    return rows[0] ?? null;
};

export const createCliente = async (nombre, mail, telefono, direccion, empresa) => {
    const { rows } = await pool.query(
        `INSERT INTO cliente (nombre, mail, telefono, direccion, empresa)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [nombre, mail, telefono, direccion, empresa || null]
    );
    return rows[0];
};

export const updateCliente = async (id, nombre, mail, telefono, direccion, empresa) => {
    const { rows } = await pool.query(
        `UPDATE cliente
         SET nombre = $1, mail = $2, telefono = $3, direccion = $4, empresa = $5
         WHERE id = $6
         RETURNING *`,
        [nombre, mail, telefono, direccion, empresa || null, id]
    );
    return rows[0];
};

export const deleteCliente = async (id) => {
    await pool.query("DELETE FROM cliente WHERE id = $1", [id]);
};