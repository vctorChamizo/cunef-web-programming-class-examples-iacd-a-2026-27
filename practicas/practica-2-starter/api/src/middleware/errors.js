// Los errores internos se registran en el servidor, no se envían al navegador.
export function errors(err, req, res, next) {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'JSON no válido.' });
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor.' });
}
