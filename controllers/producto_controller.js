import ProductoModel from "../models/producto_model.js";

const BASE64_REGEX = /^(?:data:image\/[a-zA-Z0-9.+-]+;base64,)?[A-Za-z0-9+/]+={0,2}$/;

const esBase64Valido = (valor) => {
  if (typeof valor !== "string") return false;
  const limpio = valor.trim();
  if (!limpio) return false;
  return BASE64_REGEX.test(limpio);
};

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
      const { nombre, descripcion, precio, estado, imagen } = req.body;
      if (!nombre || nombre.trim() === '') return res.status(400).json({ ok: false, message: 'El campo "nombre" es requerido' });
      if (precio === undefined || precio === null) return res.status(400).json({ ok: false, message: 'El campo "precio" es requerido' });
      if (isNaN(precio) || Number(precio) < 0) return res.status(400).json({ ok: false, message: '"precio" debe ser un número positivo' });
      if (imagen !== undefined && imagen !== null && String(imagen).trim() !== '' && !esBase64Valido(imagen)) {
        return res.status(400).json({ ok: false, message: 'El campo "imagen" debe estar en formato base64 válido' });
      }
      const nuevo = await ProductoModel.create({ nombre, descripcion, precio, estado, imagen });
      res.status(201).json({ ok: true, data: nuevo });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, estado, imagen } = req.body;
      if (!nombre || nombre.trim() === '') return res.status(400).json({ ok: false, message: 'El campo "nombre" es requerido' });
      if (precio === undefined || precio === null) return res.status(400).json({ ok: false, message: 'El campo "precio" es requerido' });
      if (isNaN(precio) || Number(precio) < 0) return res.status(400).json({ ok: false, message: '"precio" debe ser un número positivo' });
      if (imagen !== undefined && imagen !== null && String(imagen).trim() !== '' && !esBase64Valido(imagen)) {
        return res.status(400).json({ ok: false, message: 'El campo "imagen" debe estar en formato base64 válido' });
      }
      const actualizado = await ProductoModel.update(id, { nombre, descripcion, precio, estado, imagen });
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
