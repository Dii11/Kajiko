import axios from 'axios';
import { useState } from 'react'; // Importez useState si vous prévoyez de gérer l'état localement

export const UseAdd = async ({ url, data }) => {
  try {
    const response = await axios.post(url, data);
    return response; // Retournez la réponse complète pour que l'appelant puisse la gérer
  } catch (error) {
    console.error("Erreur lors de l'ajout de données:", error);
    throw error; // Propagez l'erreur pour que le composant appelant puisse la gérer
  }
};

export const UseFetchData = ({ url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setData(response.data); // Assurez-vous d'accéder à la propriété contenant les données (souvent 'data')
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // La requête se relance si l'URL change

  return { data, loading, error };
};