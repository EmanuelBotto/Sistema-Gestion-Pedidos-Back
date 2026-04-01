import * as ClienteModel from "../models/clienteModel.js";

const listarCliente = async (req, res) => {
    try {
        const clientes = await ClienteModel.getCliente();
        res.json(clientes);
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al obtener clientes" });
    }
};

const obtenerCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const clientes = await ClienteModel.getClienteById(id);
        res.json(clientes);
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al obtener Cliente" });
    }
};

const crearCliente = async (req, res) => {
    try {
        const { nombre, mail, telefono, direccion, empresa, pedidos, id } = req.body;

        if (
            !nombre || 
            !mail || 
            !telefono ||
            !direccion ||
            !empresa ||
            !pedidos ||
            !id
        ) {
            return res.status(400).json({ error: "nombre, mail, telefono, direccion, empresa, pedidos e id son obligatorios" });
        }
    } catch (error ) {
        console.log("ERROR REAL:", error);
        res.status(400).json({ error: "Error al crear Cliente" });
    }
};

const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await ClienteModel.deleteCliente(id);
        res.status(204).send();
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al eliminar Cliente "});
    }
};

const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, mail, telefono, direccion, empresa, pedidos} = req.body;
        const ClienteActualizado = await ClienteModel.updateCliente(id, nombre, mail, telefono, direccion, empresa, pedidos);
        res.json(ClienteActualizado);
    } catch (error) {
        console.log("ERROR REAL:", error);
        res.status(500).json({ error: "Error al actualizar Cliente" });
    }
};