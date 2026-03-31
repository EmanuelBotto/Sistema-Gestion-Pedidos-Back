import pool from "../config/bd.js";

export const createUsuario = async (nombre, apellido, mail, contasenia, rol) => {
    const resultado = await pool.query (
        `INSERT INTO usuario (nombre, apellido, mail, contrasenia, rol)
        VALUES ($1, $2, $3, $4. $5)
        RETURNING *`,
        [nombre, apellido, mail, contasenia, rol]
    );
    return resultado.rows[0];
};

export const getUsuario = async () => {
    const resultado = await pool.query (
        "SELECT * FROM usuario ORDER BY id DESC"
    );
    return resultado.rows[0];
};

export const getUsuarioById = async (id) => {
    const resultado = await pool.query (
        "SELECT * FROM usuario WHERE id = $1",
        [id]
    );
    return resultado.rows[0];
};

export const updateUsuario = async (id, nombre, apellido, mail, contasenia, rol) => {
    const resultado = await pool.query (
        `UPDATE usuario
        SET nombre = $1, apellido = $2, email = $3, contrasenia = $4, rol = $5
        WHERE id = $5
        RETURNING *`,
        [nombre, apellido, mail, contasenia, rol, id]
    );
    return resultado.rows[0];
};

export const deleteUsuario = async (id) => {
    const resultado = await pool.query (
        "DELETE FROM usuario WHERE id = $1",
        [id]
    );
};