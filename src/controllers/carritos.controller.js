const { sql, getConnection } = require('../database/connection');

const carritoController = {};

// Agregar un nuevo carrito
carritoController.insertarCarrito = async (req, res) => {
  try {
    const { IDUSUARIO } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('IDUSUARIO', sql.Int, IDUSUARIO)
      .input('FECHACREACION', sql.DateTime, new Date())
      .query('INSERT INTO CARRITOS (IDUSUARIO, FECHACREACION) VALUES (@IDUSUARIO, @FECHACREACION)');

    res.json({ message: 'Carrito agregado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el carrito' });
  }
};

// Obtener todos los carritos
carritoController.obtenerCarritos = async (req, res) => {
  try {
    const pool = await getConnection();
    const carritos = await pool.request().query('SELECT * FROM CARRITOS');
    res.json(carritos.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los carritos' });
  }
};

// Obtener un carrito por su ID
carritoController.obtenerCarritoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const carrito = await pool.request().input('id', sql.Int, id).query('SELECT * FROM CARRITOS WHERE IDCARRITO = @id');
    if (carrito.recordset.length > 0) {
      res.json(carrito.recordset[0]);
    } else {
      res.status(404).json({ message: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};

// Actualizar un carrito por su ID
carritoController.actualizarCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { IDUSUARIO } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('IDUSUARIO', sql.Int, IDUSUARIO)
      .query('UPDATE CARRITOS SET IDUSUARIO = @IDUSUARIO WHERE IDCARRITO = @id');

    res.json({ message: 'Carrito actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
};

// Eliminar un carrito por su ID
carritoController.eliminarCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    await pool.request().input('id', sql.Int, id).query('DELETE FROM CARRITOS WHERE IDCARRITO = @id');

    res.json({ message: 'Carrito eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el carrito' });
  }
};

module.exports = carritoController;
