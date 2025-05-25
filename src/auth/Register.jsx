import React from 'react';
import { Formik, Form } from 'formik';
import RegisterForm from './RegisterForm';
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
  } else if (values.password.length < 6) {
    errors.password = '6 caractères minimum';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirmation requise';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }
  return errors;
};

const Register = () => {
  const navigate = useNavigate();

  return (
    <div   data-theme="lemonade" className="
  
    flex items-center justify-center min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-2xl shadow-2xl border border-base-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">Créer un compte</h2>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validate={validate}
          onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
            setStatus(null);
            try {
              console.log('Données envoyées à l\'API:', {
                email: values.email,
                password: values.password,
              });
              const response = await axios.post(`${API_URL}/api/register`, {
                email: values.email,
                password: values.password,
              });
              setStatus({ success: response.data.message });
              resetForm();
              setTimeout(() => {
                navigate('/login');
              }, 1500);
            } catch (err) {
              setStatus({
                error:
                  err.response?.data?.error ||
                  "Erreur lors de l'inscription",
              });
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-5">
              <RegisterForm isSubmitting={isSubmitting} />
              {status && status.success && (
                <div className="alert alert-success mt-4">{status.success}</div>
              )}
              {status && status.error && (
                <div className="alert alert-error mt-4">{status.error}</div>
              )}
              <div className="text-center mt-4">
                <span>Déjà un compte ? </span>
                <button
                  type="button"
                  className="link link-primary"
                  onClick={() => navigate('/login')}
                >
                  Se connecter
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;