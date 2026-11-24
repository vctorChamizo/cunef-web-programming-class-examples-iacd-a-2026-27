import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function Private() {
  const [message, setMessage] = useState('Comprobando la sesión…');

  useEffect(() => {
    async function load() {
      try {
        await api.get('/auth/me');
        setMessage('La API ha aceptado el token.');
      } catch {
        setMessage('La API no ha aceptado el token.');
      }
    }
    load();
  }, []);

  return (
    <main>
      <h1>Zona protegida</h1>
      <p>{message}</p>
    </main>
  );
}
