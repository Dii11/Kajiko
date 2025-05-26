import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewCategorie from './NewCategorie';
import CategorieList from './CategorieListe';
import { fetchCategories } from '../../features/categorySlice';

const Categories = () => {
    const dispatch = useDispatch();
    const [showNew, setShowNew] = useState(false);
    const [showList, setShowList] = useState(true);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAjouter = () => {
        setShowNew(false);
        setShowList(true);
    };

    const handleAnnuler = () => {
        setShowNew(false);
        setShowList(true);
    };

    return (
        <div>
            <div className="mt-6">
                {showNew && <NewCategorie onAjouter={handleAjouter} onAnnuler={handleAnnuler} />}
                {showList && <CategorieList onAjouter={handleAjouter}/>}
            </div>
        </div>
    );
};

export default Categories;