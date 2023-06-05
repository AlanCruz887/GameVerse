const { sql, getConnection } = require('../database/connection');

const juegoController = {};

// Agregar un nuevo juego
juegoController.insertarJuego = async (req, res) => {
  try {
    const { TITULO, DESCRIPCION, PRECIO, FECHALANZAMIENTO, GENERO, PLATAFORMA, EDITOR } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('TITULO', sql.VarChar, TITULO)
      .input('DESCRIPCION', sql.VarChar, DESCRIPCION)
      .input('PRECIO', sql.Decimal(10, 2), PRECIO)
      .input('FECHALANZAMIENTO', sql.Date, FECHALANZAMIENTO)
      .input('GENERO', sql.VarChar, GENERO)
      .input('PLATAFORMA', sql.VarChar, PLATAFORMA)
      .input('EDITOR', sql.VarChar, EDITOR)
      .query('INSERT INTO JUEGOS (TITULO, DESCRIPCION, PRECIO, FECHALANZAMIENTO, GENERO, PLATAFORMA, EDITOR) VALUES (@TITULO, @DESCRIPCION, @PRECIO, @FECHALANZAMIENTO, @GENERO, @PLATAFORMA, @EDITOR)');

    res.json({ message: 'Juego agregado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el juego' });
  }
};

// Obtener todos los juegos
juegoController.obtenerJuegos = async (req, res) => {
  try {
    const pool = await getConnection();
    const juegos = await pool.request().query('SELECT * FROM JUEGOS');
    res.json(juegos.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los juegos' });
  }
};

// Obtener un juego por su ID
juegoController.obtenerJuegoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const juego = await pool.request().input('id', sql.Int, id).query('SELECT * FROM JUEGOS WHERE IDJUEGO = @id');
    if (juego.recordset.length > 0) {
      res.json(juego.recordset[0]);
    } else {
      res.status(404).json({ message: 'Juego no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el juego' });
  }
};

// Actualizar un juego por su ID
juegoController.actualizarJuego = async (req, res) => {
  try {
    const { id } = req.params;
    const { TITULO, DESCRIPCION, PRECIO, FECHALANZAMIENTO, GENERO, PLATAFORMA, EDITOR } = req.body;
    const pool = await getConnection();
    await pool
      .request()
      .input('id', sql.Int, id)
      .input('TITULO', sql.VarChar, TITULO)
      .input('DESCRIPCION', sql.VarChar, DESCRIPCION)
      .input('PRECIO', sql.Decimal(10, 2), PRECIO)
      .input('FECHALANZAMIENTO', sql.Date, FECHALANZAMIENTO)
      .input('GENERO', sql.VarChar, GENERO)
      .input('PLATAFORMA', sql.VarChar, PLATAFORMA)
      .input('EDITOR', sql.VarChar, EDITOR)
      .query('UPDATE JUEGOS SET TITULO = @TITULO, DESCRIPCION = @DESCRIPCION, PRECIO = @PRECIO, FECHALANZAMIENTO = @FECHALANZAMIENTO, GENERO = @GENERO, PLATAFORMA = @PLATAFORMA, EDITOR = @EDITOR WHERE IDJUEGO = @id');

    res.json({ message: 'Juego actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el juego' });
  }
};

// Eliminar un juego por su ID
juegoController.eliminarJuego = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    await pool.request().input('id', sql.Int, id).query('DELETE FROM JUEGOS WHERE IDJUEGO = @id');

    res.json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el juego' });
  }
};

module.exports = juegoController;
