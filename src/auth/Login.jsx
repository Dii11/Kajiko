import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email requis';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Adresse email invalide';
  }
  if (!values.password) {
    errors.password = 'Mot de passe requis';
  }
  return errors;
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-sm p-8 bg-base-100 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validate}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            setStatus(null);
            try {
              const response = await axios.post(`${API_URL}/api/login`, {
                email: values.email,
                password: values.password,
              });
              // Stocker le token JWT
              localStorage.setItem('token', response.data.token);
              setStatus({ success: 'Connexion réussie !' });
              setTimeout(() => {
                navigate('/home'); // Redirigez où vous voulez après connexion
              }, 1000);
            } catch (err) {
              setStatus({
                error:
                  err.response?.data?.error ||
                  "Erreur lors de la connexion",
              });
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-5">
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  autoComplete="username"
                />
                <ErrorMessage name="email" component="div" className="text-error text-sm" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Mot de passe</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  className="input input-bordered w-full"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password" component="div" className="text-error text-sm" />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                Se connecter
              </button>
              {status && status.success && (
                <div className="alert alert-success mt-4">{status.success}</div>
              )}
              {status && status.error && (
                <div className="alert alert-error mt-4">{status.error}</div>
              )}
              <div className="text-center mt-4">
                <span>Pas de compte ? </span>
                <button
                  type="button"
                  className="link link-primary"
                  onClick={() => navigate('/register')}
                >
                  Créer un compte
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;