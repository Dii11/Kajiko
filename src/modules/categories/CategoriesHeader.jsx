import NewCategorie from './NewCategorie';
import CategorieList from './CategorieListe';

const CategoriesHeader = () => {

  

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Liste des catégories</h2>
            <section className="flex flex-wrap gap-4 items-center">
                <input
                    type="text"
                    placeholder="Rechercher une catégorie..."
                    className="input input-bordered w-full max-w-xs"
                />
                <select className="select select-bordered">
                    <option value="">Filtrer par type</option>
                    <option value="dépense">Dépense</option>
                    <option value="revenu">Revenu</option>
                </select>
            </section>
        </div>
    );
};

export default CategoriesHeader;