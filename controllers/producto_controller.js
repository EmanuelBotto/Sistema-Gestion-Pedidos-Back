import ProductoModel from "../models/producto_model.js";

const ProductoController = {
  async getAll(req, res) {
    try {
      const productos = await ProductoModel.getAll();
      res.json({ ok: true, data: productos });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const producto = await ProductoModel.getById(id);
      if (!producto) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
      res.json({ ok: true, data: producto });
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async create(req, res) {
    try {
      const { nombre, descripcion, precio, estado } = req.body;
      if (!nombre || nombre.trim() === '') return res.status(400).json({ ok: false, message: 'El campo "nombre" es requerido' });
      if (precio === undefined || precio === null) return res.status(400).json({ ok: false, message: 'El campo "precio" es requerido' });
      if (isNaN(precio) || Number(precio) < 0) return res.status(400).json({ ok: false, message: '"precio" debe ser un número positivo' });
      const nuevo = await ProductoModel.create({ nombre, descripcion, precio, estado });
      res.status(201).json({ ok: true, data: nuevo });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, estado } = req.body;
      if (!nombre || nombre.trim() === '') return res.status(400).json({ ok: false, message: 'El campo "nombre" es requerido' });
      if (precio === undefined || precio === null) return res.status(400).json({ ok: false, message: 'El campo "precio" es requerido' });
      if (isNaN(precio) || Number(precio) < 0) return res.status(400).json({ ok: false, message: '"precio" debe ser un número positivo' });
      const actualizado = await ProductoModel.update(id, { nombre, descripcion, precio, estado });
      if (!actualizado) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
      res.json({ ok: true, data: actualizado });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await ProductoModel.delete(id);
      if (!eliminado) return res.status(404).json({ ok: false, message: 'Producto no encontrado' });
      res.json({ ok: true, message: 'Producto eliminado correctamente', data: eliminado });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },
};

export default ProductoController;
