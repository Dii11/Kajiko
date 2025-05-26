import { Edit } from "lucide-react";
import img from "../../assets/fond .webp";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {  updateUser } from "../../features/userSlice";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nom: user?.nom || "",
    prenom: user?.prenom || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setForm({
      nom: user?.nom || "",
      prenom: user?.prenom || "",
      email: user?.email || "",
      telephone: user?.telephone || "",
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateUser({ id: user.id, ...form })).unwrap();
      setShowModal(false);
    } catch (err) {
      alert("Erreur lors de la modification");
    }
    setLoading(false);
  };

  return (
    <div className="m-2 p-4 shadow-md rounded-lg bg-gray-50">
      <div className="flex justify-between">
        <h5 className="text-primary">Information personnelle</h5>
        <button
          className="bg-success px-2 py-1 rounded-lg flex items-center text-white gap-2 text-sm"
          onClick={openModal}
        >
          <Edit width={18} />
          <>Modifier</>
        </button>
      </div>
      <section className="flex items-center gap-8 mt-6">
        <img
          src={img}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Nom&nbsp;:</span>{" "}
            <span>{user?.nom || "—"}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Prénom&nbsp;:</span>{" "}
            <span>{user?.prenom || "—"}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Email&nbsp;:</span>{" "}
            <span>{user?.email || "—"}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Téléphone&nbsp;:</span>{" "}
            <span>{user?.telephone || "—"}</span>
          </div>
        </div>
      </section>

      {/* Modal DaisyUI */}
      {showModal && (
        <dialog id="edit_modal" className="modal modal-open">
          <form method="dialog" className="modal-box" onSubmit={handleSave}>
            <h3 className="font-bold text-lg mb-4">Modifier mes informations</h3>
            <div className="space-y-3">
              <div>
                <label className="label">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                Sauvegarder
              </button>
              <button
                type="button"
                className="btn"
                onClick={closeModal}
                disabled={loading}
              >
                Annuler
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Profile;