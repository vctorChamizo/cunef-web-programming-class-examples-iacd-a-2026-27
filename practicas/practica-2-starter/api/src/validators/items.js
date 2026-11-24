import { z } from 'zod';

// Una regla mínima para observar dónde se validan los datos recibidos.
export const itemSchema = z
  .object({
    name: z.string().trim().min(1).max(80),
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
