import PedidoModel from "../models/pedido_model.js";

const PedidoController = {
  async getAll(req, res) {
    try {
      const pedidos = await PedidoModel.getAll();
      res.json({ ok: true, data: pedidos });
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const pedido = await PedidoModel.getById(id);
      if (!pedido) return res.status(404).json({ ok: false, message: 'Pedido no encontrado' });
      res.json({ ok: true, data: pedido });
    } catch (error) {
      console.error('Error al obtener pedido:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async create(req, res) {
    try {
      const { cliente_id, estado } = req.body;
      if (!cliente_id) return res.status(400).json({ ok: false, message: 'El campo "cliente_id" es requerido' });
      const nuevo = await PedidoModel.create({ cliente_id, estado });
      res.status(201).json({ ok: true, data: nuevo });
    } catch (error) {
      console.error('Error al crear pedido:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      if (!estado) return res.status(400).json({ ok: false, message: 'El campo "estado" es requerido' });
      const actualizado = await PedidoModel.update(id, { estado });
      if (!actualizado) return res.status(404).json({ ok: false, message: 'Pedido no encontrado' });
      res.json({ ok: true, data: actualizado });
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await PedidoModel.delete(id);
      if (!eliminado) return res.status(404).json({ ok: false, message: 'Pedido no encontrado' });
      res.json({ ok: true, message: 'Pedido eliminado correctamente', data: eliminado });
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
      res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  },
};

export default PedidoController;
