import { Edit } from "lucide-react";
import img from "../../assets/fond .webp";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../features/userSlice";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
      className="m-2 p-10 shadow-xl rounded-2xl bg-gradient-to-br from-base-100 via-white to-base-200 border border-base-300"
    >
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-2xl font-bold text-primary">Informations personnelles</h5>
        <button
          className="bg-success/90 hover:bg-success px-3 py-2 rounded-xl flex items-center text-white gap-2 text-md shadow transition"
          onClick={openModal}
        >
          <Edit width={20} />
          <>Modifier</>
        </button>
      </div>
      <section className="flex flex-col md:flex-row items-center gap-8 mt-6">
        <motion.img
          src={img}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <div className="w-full max-w-md space-y-3">
          <div>
            <span className="font-semibold text-gray-700">Nom&nbsp;:</span>{" "}
            <span className="text-lg">{user?.nom || "—"}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Prénom&nbsp;:</span>{" "}
            <span className="text-lg">{user?.prenom || "—"}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email&nbsp;:</span>{" "}
            <span className="text-lg">{user?.email || "—"}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Téléphone&nbsp;:</span>{" "}
            <span className="text-lg">{user?.telephone || "—"}</span>
          </div>
        </div>
      </section>

      {/* Modal animé */}
      <AnimatePresence>
        {showModal && (
          <motion.dialog
            id="edit_modal"
            className="modal modal-open"
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 60 }}
            transition={{ duration: 0.35 }}
          >
            <form method="dialog" className="modal-box" onSubmit={handleSave}>
              <h3 className="font-bold text-lg mb-4 text-primary">Modifier mes informations</h3>
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
          </motion.dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;