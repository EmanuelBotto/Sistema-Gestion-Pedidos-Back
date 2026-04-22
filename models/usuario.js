import pool from "../config/bd.js";

// Crear usuario
export const createUsuario = async (nombre, apellido, mail, contrasenia, rol) => {
    const resultado = await pool.query(
        `INSERT INTO usuario (nombre, apellido, mail, contrasenia, rol)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [nombre, apellido, mail, contrasenia, rol]
    );
    return resultado.rows[0];
};

// Listar usuarios
export const getUsuarios = async () => {
    const resultado = await pool.query(
        "SELECT * FROM usuario ORDER BY id DESC"
    );
    return resultado.rows;
};

// Obtener por ID
export const getUsuarioById = async (id) => {
    const resultado = await pool.query(
        "SELECT * FROM usuario WHERE id = $1",
        [id]
    );
    return resultado.rows[0];
};

// Obtener por mail (para login y roles no-cliente)
export const getUsuarioByMail = async (mail) => {
    const resultado = await pool.query(
        "SELECT * FROM usuario WHERE mail = $1",
        [mail]
    );
    return resultado.rows[0];
};

// Obtener por nombre (para relacionar movimientos de stock)
export const getUsuarioByNombre = async (nombre) => {
    const resultado = await pool.query(
        "SELECT * FROM usuario WHERE LOWER(nombre) = LOWER($1) LIMIT 1",
        [nombre]
    );
    return resultado.rows[0];
};

// Actualizar
export const updateUsuario = async (id, nombre, apellido, mail, contrasenia, rol) => {
    const resultado = await pool.query(
        `UPDATE usuario
         SET nombre = $1, apellido = $2, mail = $3, contrasenia = $4, rol = $5, cliente_id = $6
         WHERE id = $7
         RETURNING *`,
        [nombre, apellido, mail, contrasenia, rol, cliente_id, id]
    );
    return resultado.rows[0];
};

// Eliminar
export const deleteUsuario = async (id) => {
    await pool.query(
        "DELETE FROM usuario WHERE id = $1",
        [id]
    );
};
