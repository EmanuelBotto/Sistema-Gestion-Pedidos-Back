import PedidoModel from "../models/pedido_model.js";

const PedidoController = {
  async getAll(req, res) {
    try {
      const { rol, cliente_id } = req.usuario ?? {};

      // Si es cliente, solo devuelve sus propios pedidos
      // Si es empleado o admin, devuelve todos
      const pedidos = rol === "cliente"
        ? await PedidoModel.getByClienteId(cliente_id)
        : await PedidoModel.getAll();

      res.json({ ok: true, data: pedidos });
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const pedido = await PedidoModel.getById(id);
      if (!pedido) return res.status(404).json({ ok: false, message: "Pedido no encontrado" });

      // Un cliente solo puede ver sus propios pedidos
      const { rol, cliente_id } = req.usuario ?? {};
      if (rol === "cliente" && String(pedido.cliente_id) !== String(cliente_id)) {
        return res.status(403).json({ ok: false, message: "Acceso denegado" });
      }

      res.json({ ok: true, data: pedido });
    } catch (error) {
      console.error("Error al obtener pedido:", error);
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
  },

  async create(req, res) {
    try {
      const { rol, cliente_id: clienteIdToken } = req.usuario ?? {};

      // Si es cliente, el cliente_id viene del token (no del body)
      // Si es admin/empleado, puede especificarlo en el body
      const cliente_id = rol === "cliente"
        ? clienteIdToken
        : req.body.cliente_id;

      if (!cliente_id) {
        return res.status(400).json({ ok: false, message: 'El campo "cliente_id" es requerido' });
      }

      const { estado } = req.body;
      const nuevo = await PedidoModel.create({ cliente_id, estado });
      res.status(201).json({ ok: true, data: nuevo });
    } catch (error) {
      console.error("Error al crear pedido:", error);
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      if (!estado) return res.status(400).json({ ok: false, message: 'El campo "estado" es requerido' });
      const actualizado = await PedidoModel.update(id, { estado });
      if (!actualizado) return res.status(404).json({ ok: false, message: "Pedido no encontrado" });
      res.json({ ok: true, data: actualizado });
    } catch (error) {
      console.error("Error al actualizar pedido:", error);
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await PedidoModel.delete(id);
      if (!eliminado) return res.status(404).json({ ok: false, message: "Pedido no encontrado" });
      res.json({ ok: true, message: "Pedido eliminado correctamente", data: eliminado });
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
      res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
  },
};

export default PedidoController;