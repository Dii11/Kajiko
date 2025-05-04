import axios from 'axios';
import { useState, useEffect } from 'react'; // Import both useState and useEffect

export const UseAdd = async ({ url, data }) => {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    console.error("Erreur lors de l'ajout de données:", error);
    throw error;
  }
};

export const useFetchData = ({ url }) => { // Renamed to useFetchData
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};