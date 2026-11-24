import { z } from 'zod';

// Una regla mínima para observar dónde se validan los datos recibidos.
// Cada regla lleva su propio mensaje: sin él, Zod responde con su texto por defecto en inglés.
export const itemSchema = z
  .object({
    name: z
      .string({ error: 'El nombre es obligatorio y debe ser un texto.' })
      .trim()
      .min(1, 'El nombre no puede estar vacío.')
      .max(80, 'El nombre admite como máximo 80 caracteres.'),
  })
  .strip();

export function validateItem(req, res, next) {
  const result = itemSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }

  req.validated = result.data;
  next();
}
