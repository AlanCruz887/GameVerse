const { sql, getConnection } = require('../database/connection');

const clienteController = {};

// Agregar un nuevo cliente
clienteController.insertarCliente = async (req, res) => {
  try {
    const { NOMBREUSUARIO, EMAIL, CONTRASENIA } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('NOMBREUSUARIO', NOMBREUSUARIO)
      .input('EMAIL', EMAIL)
      .input('CONTRASENIA', CONTRASENIA)
      .query('INSERT INTO USUARIOS (NOMBREUSUARIO, EMAIL, CONTRASENIA, FECHAREGISTRO, IDCARRITO) VALUES (@NOMBREUSUARIO, @EMAIL, @CONTRASENIA, GETDATE(), NULL)');

    res.status(200).json({ message: 'Cliente agregado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el cliente' });
  }
};

// Obtener todos los clientes
clienteController.obtenerClientes = async (req, res) => {
  try {
    const pool = await getConnection();
    const usuarios = await pool.request().query('SELECT * FROM USUARIOS');

    res.status(200).json(usuarios.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
};

// Obtener un cliente por su ID
clienteController.obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const usuario = await pool.request().input('IDUSUARIO', sql.Int, id).query('SELECT * FROM USUARIOS WHERE IDUSUARIO = @IDUSUARIO');

    if (usuario.recordset.length === 0) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.status(200).json(usuario.recordset[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el cliente' });
  }
};

// Actualizar un cliente
clienteController.actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { NOMBREUSUARIO, EMAIL, CONTRASENIA } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('IDUSUARIO', sql.Int, id)
      .input('NOMBREUSUARIO', NOMBREUSUARIO)
      .input('EMAIL', EMAIL)
      .input('CONTRASENIA', CONTRASENIA)
      .query('UPDATE USUARIOS SET NOMBREUSUARIO = @NOMBREUSUARIO, EMAIL = @EMAIL, CONTRASENIA = @CONTRASENIA WHERE IDUSUARIO = @IDUSUARIO');

    res.status(200).json({ message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
};

// Eliminar un cliente
clienteController.eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    await pool.request().input('IDUSUARIO', sql.Int, id).query('DELETE FROM USUARIOS WHERE IDUSUARIO = @IDUSUARIO');

    res.status(200).json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el cliente' });
  }
};

module.exports = clienteController;
