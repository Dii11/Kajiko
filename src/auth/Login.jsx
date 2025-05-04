import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Variable d’environnement VITE
const API_URL ="http://localhost:3001"

// Schéma de validation avec Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse e-mail invalide')
    .required("L'e-mail est requis"),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Le mot de passe est requis'),
});

const LoginForm = () => {
  const [serverError, setServerError] = useState("");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-gray-700 text-center font-bold mb-6 text-xl">Connexion</h1>

        {serverError && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {serverError}
          </div>
        )}

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setServerError(""); // Reset erreur
            try {
              const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
              });

              const data = await response.json();

              if (!response.ok) {
                setServerError(data.message || "Erreur lors de la connexion");
              } else {
                // ✅ Stocker token + redirection (optionnelle)
                localStorage.setItem('token', data.token);
                alert("Connexion réussie !");
                // window.location.href = "/dashboard"; // redirection possible
              }
            } catch (error) {
              setServerError("Erreur de connexion au serveur");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  E-mail
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Votre e-mail"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic" />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Mot de passe
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Votre mot de passe"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-xs italic" />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Connexion..." : "Se connecter"}
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
