import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function Items() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // La misma función se usa al cargar y al pulsar Actualizar.
  async function loadItems() {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/items');
      setData(response.data);
    } catch {
      setError('No se ha podido consultar la API.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      await loadItems();
    }
    load();
  }, []);

  return (
    <main>
      <h1>Elementos de ejemplo</h1>
      <button onClick={loadItems}>Actualizar</button>
      {loading && <p>Cargando…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && data.length === 0 && <p>No hay elementos.</p>}
      {!loading && !error && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
