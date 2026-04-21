import MovimientoStockModel from "../models/movimiento_stock_model.js";
import { getUsuarioById, getUsuarioByMail, getUsuarioByNombre } from "../models/usuario.js";

const MovimientoStockController = {
  async getAll(req, res) {
    try {
      const movimientos = await MovimientoStockModel.getAll();
      res.json({ ok: true, data: movimientos });
    } catch (error) {
      console.error('Error al obtener movimientos:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const movimiento = await MovimientoStockModel.getById(id);
      if (!movimiento) return res.status(404).json({ ok: false, message: 'Movimiento no encontrado' });
      res.json({ ok: true, data: movimiento });
    } catch (error) {
      console.error('Error al obtener movimiento:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async create(req, res) {
    try {
      const { producto_id, tipo, cantidad, usuario_realizo_movimiento } = req.body;

      if (!producto_id) return res.status(400).json({ ok: false, message: 'El campo "producto_id" es requerido' });
      if (!tipo || !['entrada', 'salida'].includes(tipo)) return res.status(400).json({ ok: false, message: '"tipo" debe ser "entrada" o "salida"' });
      if (!cantidad || cantidad <= 0) return res.status(400).json({ ok: false, message: '"cantidad" debe ser mayor a 0' });
      if (!usuario_realizo_movimiento) return res.status(400).json({ ok: false, message: 'El campo "usuario_realizo_movimiento" es requerido' });

      let usuarioId = null;
      const valorUsuario = String(usuario_realizo_movimiento).trim();

      // Permite enviar id, mail o nombre desde el frontend y lo normaliza a id.
      if (/^\d+$/.test(valorUsuario)) {
        const usuario = await getUsuarioById(Number(valorUsuario));
        if (usuario) usuarioId = usuario.id;
      } else if (valorUsuario.includes("@")) {
        const usuario = await getUsuarioByMail(valorUsuario);
        if (usuario) usuarioId = usuario.id;
      } else {
        const usuario = await getUsuarioByNombre(valorUsuario);
        if (usuario) usuarioId = usuario.id;
      }

      if (!usuarioId) {
        return res.status(400).json({
          ok: false,
          message: 'Usuario no válido. Enviá id, mail o nombre existente en "usuario_realizo_movimiento"',
        });
      }

      const nuevo = await MovimientoStockModel.create({ producto_id, tipo, cantidad, usuario_realizo_movimiento: usuarioId });
      res.status(201).json({ ok: true, data: nuevo });
    } catch (error) {
      console.error('Error al crear movimiento:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await MovimientoStockModel.delete(id);
      if (!eliminado) return res.status(404).json({ ok: false, message: 'Movimiento no encontrado' });
      res.json({ ok: true, message: 'Movimiento eliminado correctamente', data: eliminado });
    } catch (error) {
      console.error('Error al eliminar movimiento:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },
};

export default MovimientoStockController;