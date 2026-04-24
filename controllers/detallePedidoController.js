import DetallePedidoModel from "../models/detallePedidoModel.js";

const DetallePedidoController = {
    async getAll(req, res) {
        try {
            const detalles = await DetallePedidoModel.getAll();
            res.json({ ok: true, data: detalles });
        } catch (error) {
            console.error("Error al obtener detalles del pedido:", error);
            res.status(500).json({ ok: false, message: "Error interno del servidor" });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const detalle = await DetallePedidoModel.getById(id);
            if (!detalle) {
                return res.status(404).json({ ok: false, message: "Detalle del pedido no encontrado" });
            }
            res.json({ ok: true, data: detalle });
        } catch (error) {
            console.error('Error al obtener detalle del pedido:', error);
            res.status(500).json({ ok: false, message: 'Error interno del servidor' });
        }
    },

    async create(req, res) {
        try {
            const { cantidad, precio_unitario } = req.body;
            const pedido_id = req.body.pedido_id ?? req.body.pedido;
            const producto_id = req.body.producto_id ?? req.body.producto;
            if (!cantidad || cantidad <= 0) {
                return res.status(400).json({ ok: false, message: 'El campo "cantidad" debe ser mayor a 0' });
            }
            if (precio_unitario === undefined || precio_unitario === null) {
                return res.status(400).json({ ok: false, message: 'El campo "precio_unitario" es requerido' });
            }
            if (isNaN(precio_unitario) || Number(precio_unitario) < 0) {
                return res.status(400).json({ ok: false, message: '"precio_unitario" debe ser un número positivo' });
            }
            if (!pedido_id) return res.status(400).json({ ok: false, message: 'El campo "pedido_id" es requerido' });
            if (!producto_id) return res.status(400).json({ ok: false, message: 'El campo "producto_id" es requerido' });

            const nuevo = await DetallePedidoModel.create({ cantidad, precio_unitario, pedido_id, producto_id });
            res.status(201).json({ ok: true, data: nuevo });
        } catch (error) {
            console.error('Error al crear detalle del pedido:', error);
            res.status(500).json({ ok: false, message: 'Error interno del servidor' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { cantidad, precio_unitario } = req.body;
            const pedido_id = req.body.pedido_id ?? req.body.pedido;
            const producto_id = req.body.producto_id ?? req.body.producto;
            if (!cantidad || cantidad <= 0) {
                return res.status(400).json({ ok: false, message: 'El campo "cantidad" debe ser mayor a 0' });
            }
            if (precio_unitario === undefined || precio_unitario === null) {
                return res.status(400).json({ ok: false, message: 'El campo "precio_unitario" es requerido' });
            }
            if (isNaN(precio_unitario) || Number(precio_unitario) < 0) {
                return res.status(400).json({ ok: false, message: '"precio_unitario" debe ser un número positivo' });
            }
            if (!pedido_id) return res.status(400).json({ ok: false, message: 'El campo "pedido_id" es requerido' });
            if (!producto_id) return res.status(400).json({ ok: false, message: 'El campo "producto_id" es requerido' });

            const actualizado = await DetallePedidoModel.update(id, { cantidad, precio_unitario, pedido_id, producto_id });
            if (!actualizado) {
                return res.status(404).json({ ok: false, message: 'Detalle del pedido no encontrado' });
            }
            res.json({ ok: true, data: actualizado });
        } catch (error) {
            console.error('Error al actualizar detalle del pedido:', error);
            res.status(500).json({ ok: false, message: 'Error interno del servidor' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await DetallePedidoModel.delete(id);
            if (!eliminado) {
                return res.status(404).json({ ok: false, message: "Detalle del pedido no encontrado" });
            }
            res.json({ ok: true, message: "Detalle del pedido eliminado correctamente" });
        } catch (error) {
            console.error("Error al eliminar detalle del pedido:", error);
            res.status(500).json({ ok: false, message: "Error interno del servidor" });
        }
    },
};

export default DetallePedidoController;