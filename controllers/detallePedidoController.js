import DetallePedidoModel from "../models/detallePedidoModel.js";

const DetallePedidoController = {
    async getAll(req, res) {
        try {
            const detalles = await DetallePedidoModel.getAll();
            res.json({ ok: true, data: detalles });
        } catch (error) {
            console.error("Error al obtener detalles del pedido:", error);
            res.status(500).json({ ok: false, massage: "Error interno del servidor" });
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

    async update(req, res) {
        try {
            const { id } = req.params;
            const { cantidad, precio_unitario, pedido, producto } = req.body;
            if (!cantidad || cantidad.trim() === '') {
                return res.status(400).json({ ok: false, message: 'El campo "cantidad" es requerido' });
            }
            if (precio_unitario === undefined || precio_unitario === null) {
                return res.status(400).json({ ok: false, message: 'El campo "precio unitario" es requerido' });
            }
            if (isNaN(precio) || Number(precio) < 0) {
                return res.status(400).json({ ok: false, message: 'El "precio" debe ser un número positivo' });
            }
            const actualizado = await ProductoModel.update(id, { cantidad, precio_unitario, pedido, producto });
            if (!actualizado) {
                return res.status(404).json({ ok: false, message: 'Detalle del pedido no encontrado' });
            }
            res.json({ ok: true, data: actualizado });
        } catch (error) {
            console.error('Error al actualizar detalle del pedido :', error);
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
            res.status(500).json({ ok: false, message: "Error intenro del servidor" });
        }
    },
};