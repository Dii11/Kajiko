import React from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";
const validateForm = Yup.object({
  nom: Yup.string().required(),
  prenom: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string()
    .min(6, "mot de passe doit contenir au moins 6 caractères")
    .required("mot de passe obligatoire"),
  confirm: Yup.string().required("les mots de passe doivent être conforme"),
});
const Register = () => {
  const initialValue = {
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirm: "",
    dateCreation: "",
  };
  const handleSubmit = (values) => {
    console.log("inscription réussi", values);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-primaryColor ">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primaryColor">
          Créer un compte
        </h2>
        <Formik initialValues={initialValue} validationSchema={validateForm}>
          <Form className="space-y-4">
            <div>
                <label htmlFor="nom" className="block mb-1 text-gray-600">Nom</label>
                <Field type='text' name='nom' className='w-full px-4 py-2 border rounded-md focus:outline-none'/>
                <ErrorMessage name="nom" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
              <label className="block mb-1 text-gray-600">Prénom</label>
              <Field
                type="text"
                name="prenom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primaryColor"
              />
              <ErrorMessage name="prenom" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primaryColor"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Mot de passe</label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primaryColor"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Confirmer le mot de passe</label>
              <Field
                type="password"
                name="confirmer"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primaryColor"
              />
              <ErrorMessage name="confirmer" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="w-full bg-primaryColor text-white py-2 rounded-md hover:bg-primaryColor/90 transition"
            >
              S'inscrire
            </button>
          </Form>
        </Formik>

        <p className="text-sm text-center mt-4">
          Vous avez déjà un compte ?{' '}
          <a href="/login" className="text-primaryColor hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;