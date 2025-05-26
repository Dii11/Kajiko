import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../features/categorySlice';

const CategorieListe = ({ onNouveauClick }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  return (
    <div className="overflow-x-auto bg-base-100 rounded-2xl p-6">
      <div className='flex justify-between'>
<h4>liste</h4>
<button className="btn btn-accent mt-4" onClick={onNouveauClick}>
                Nouveau
            </button>
      </div>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.nom}</td>
              <td>{cat.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {status === 'loading' && <div className="mt-2">Chargement...</div>}
      {status === 'failed' && <div className="mt-2 text-error">Erreur lors du chargement</div>}
    </div>
  );
};

export default CategorieListe;