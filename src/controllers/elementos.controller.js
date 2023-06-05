const { sql, getConnection } = require('../database/connection');

const elementoCarritoController = {};

// Agregar un nuevo elemento al carrito
elementoCarritoController.insertarElementoCarrito = async (req, res) => {
  try {
    const { IDCARRITO, IDJUEGO, CANTIDAD } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('IDCARRITO', sql.Int, IDCARRITO)
      .input('IDJUEGO', sql.Int, IDJUEGO)
      .input('CANTIDAD', sql.Int, CANTIDAD)
      .query('INSERT INTO ELEMENTOSCARRITO (IDCARRITO, IDJUEGO, CANTIDAD) VALUES (@IDCARRITO, @IDJUEGO, @CANTIDAD)');

    res.json({ message: 'Elemento del carrito agregado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el elemento del carrito' });
  }
};

// Obtener todos los elementos del carrito
elementoCarritoController.obtenerElementosCarrito = async (req, res) => {
  try {
    const pool = await getConnection();
    const elementosCarrito = await pool.request().query('SELECT * FROM ELEMENTOSCARRITO');
    res.json(elementosCarrito.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los elementos del carrito' });
  }
};

// Obtener un elemento del carrito por su ID
elementoCarritoController.obtenerElementoCarritoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const elementoCarrito = await pool.request().input('id', sql.Int, id).query('SELECT * FROM ELEMENTOSCARRITO WHERE IDELEMENTOCARRITO = @id');
    if (elementoCarrito.recordset.length > 0) {
      res.json(elementoCarrito.recordset[0]);
    } else {
      res.status(404).json({ message: 'Elemento del carrito no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el elemento del carrito' });
  }
};

// Actualizar un elemento del carrito por su ID
elementoCarritoController.actualizarElementoCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { IDCARRITO, IDJUEGO, CANTIDAD } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('IDCARRITO', sql.Int, IDCARRITO)
      .input('IDJUEGO', sql.Int, IDJUEGO)
      .input('CANTIDAD', sql.Int, CANTIDAD)
      .query('UPDATE ELEMENTOSCARRITO SET IDCARRITO = @IDCARRITO, IDJUEGO = @IDJUEGO, CANTIDAD = @CANTIDAD WHERE IDELEMENTOCARRITO = @id');

    res.json({ message: 'Elemento del carrito actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el elemento del carrito' });
  }
};

// Eliminar un elemento del carrito por su ID
elementoCarritoController.eliminarElementoCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    await pool.request().input('id', sql.Int, id).query('DELETE FROM ELEMENTOSCARRITO WHERE IDELEMENTOCARRITO = @id');

    res.json({ message: 'Elemento del carrito eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el elemento del carrito' });
  }
};

module.exports = elementoCarritoController;
