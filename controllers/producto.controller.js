import pool from "../config/bd.js";


const ProductoController = {
  // GET /productos
  async getAll(req, res) {
    try {
      const productos = await pool.getAll();
      res.json({ ok: true, data: productos });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  // GET /productos/:id
  async getById(req, res) {
    try {
      const { id } = req.params;
      const producto = await pool.getById(id);

      if (!producto) {
        return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
      }

      res.json({ ok: true, data: producto });
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  // POST /productos
  async create(req, res) {
    try {
      const { nombre, descripcion, precio, estado } = req.body;

      // Validaciones básicas
      if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ ok: false, message: 'El campo "nombre" es requerido' });
      }
      if (precio === undefined || precio === null) {
        return res.status(400).json({ ok: false, message: 'El campo "precio" es requerido' });
      }
      if (isNaN(precio) || Number(precio) < 0) {
        return res.status(400).json({ ok: false, message: 'El "precio" debe ser un número positivo' });
      }

      const nuevo = await pool.create({ nombre, descripcion, precio, estado });
      res.status(201).json({ ok: true, data: nuevo });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  // PUT /productos/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, estado } = req.body;

      // Validaciones básicas
      if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ ok: false, message: 'El campo "nombre" es requerido' });
      }
      if (precio === undefined || precio === null) {
        return res.status(400).json({ ok: false, message: 'El campo "precio" es requerido' });
      }
      if (isNaN(precio) || Number(precio) < 0) {
        return res.status(400).json({ ok: false, message: 'El "precio" debe ser un número positivo' });
      }

      const actualizado = await pool.update(id, { nombre, descripcion, precio, estado });

      if (!actualizado) {
        return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
      }

      res.json({ ok: true, data: actualizado });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  // DELETE /productos/:id
  async delete(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await pool.delete(id);

      if (!eliminado) {
        return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
      }

      res.json({ ok: true, message: 'Producto eliminado correctamente', data: eliminado });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },
};

module.exports = ProductoController;
