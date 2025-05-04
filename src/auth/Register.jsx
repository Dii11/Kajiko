import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UseAdd } from "../hook/UseCustomHook.js";

const validateForm = Yup.object({
  nom: Yup.string().required("Le nom est obligatoire"),
  prenom: Yup.string().required("Le prénom est obligatoire"),
  email: Yup.string().email("Adresse email invalide").required("L'email est obligatoire"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est obligatoire"),
  confirmer: Yup.string()
    .oneOf([Yup.ref('password'), null], "Les mots de passe doivent correspondre")
    .required("La confirmation du mot de passe est obligatoire"),
});

const Register = () => {
  const navigate = useNavigate();
  const api = "http://localhost:3001"
  const REGISTER_ENDPOINT = "/auth/register";

  const handleSubmit = async (values, { resetForm }) => {
    console.log(api)

    try {
      const response = await UseAdd({ url: `${api}${REGISTER_ENDPOINT}`, data: values });
      resetForm();
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primaryColor ">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primaryColor">
          Créer un compte
        </h2>
        <Formik
          initialValues={{ nom: "", prenom: "", email: "", password: "", confirmer: "" }}
          validationSchema={validateForm}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="nom" className="block mb-1 text-gray-600">Nom</label>
                <Field type='text' name='nom' id='nom' className='w-full px-4 py-2 border rounded-md focus:outline-none'/>
                <ErrorMessage name="nom" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="prenom" className="block mb-1 text-gray-600">Prénom</label>
                <Field
                  type="text"
                  name="prenom"
                  id="prenom"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primaryColor"
                />
                <ErrorMessage name="prenom" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 text-gray-600">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primaryColor"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-gray-600">Mot de passe</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primaryColor"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="confirmer" className="block mb-1 text-gray-600">Confirmer le mot de passe</label>
                <Field
                  type="password"
                  name="confirmer"
                  id="confirmer"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primaryColor"
                />
                <ErrorMessage name="confirmer" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="w-full bg-primaryColor text-white py-2 rounded-md hover:bg-primaryColor/90 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-center mt-4">
          Vous avez déjà un compte ? <a href="/login" className="text-primaryColor hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;