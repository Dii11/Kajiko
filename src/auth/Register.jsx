import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RegisterForm from './RegisterForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const validateStep1 = values => {
  const errors = {};
  if (!values.nom) errors.nom = 'Nom requis';
  if (!values.prenom) errors.prenom = 'Prénom requis';
  if (!values.telephone) errors.telephone = 'Téléphone requis';
  return errors;
};

const validateStep2 = values => {
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
  const [step, setStep] = useState(1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full max-w-md p-8 bg-slate-900 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-accent">Créer un compte</h2>
        <Formik
          initialValues={{
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validate={step === 1 ? validateStep1 : validateStep2}
          onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
            setStatus(null);
            if (step === 1) {
              setStep(2);
              setSubmitting(false);
              return;
            }
            try {
              const response = await axios.post(`${API_URL}/api/register`, {
                nom: values.nom,
                prenom: values.prenom,
                telephone: values.telephone,
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
          {({ isSubmitting, status, errors, touched, handleSubmit }) => (
            <Form className="space-y-5" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div>
                    <label className="label">
                      <span className="label-text">Nom</span>
                    </label>
                    <Field name="nom" placeholder="Nom" className="input input-bordered w-full" />
                    <ErrorMessage name="nom" component="div" className="text-error text-sm" />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Prénom</span>
                    </label>
                    <Field name="prenom" placeholder="Prénom" className="input input-bordered w-full" />
                    <ErrorMessage name="prenom" component="div" className="text-error text-sm" />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Téléphone</span>
                    </label>
                    <Field name="telephone" placeholder="Téléphone" className="input input-bordered w-full" />
                    <ErrorMessage name="telephone" component="div" className="text-error text-sm" />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-accent w-full"
                    disabled={isSubmitting}
                  >
                    Suivant
                  </button>
                </>
              )}
              {step === 2 && (
                <>
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
                      autoComplete="new-password"
                    />
                    <ErrorMessage name="password" component="div" className="text-error text-sm" />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Confirmer le mot de passe</span>
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="input input-bordered w-full"
                      autoComplete="new-password"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-error text-sm" />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-accent w-full"
                    disabled={isSubmitting}
                  >
                    Créer un compte
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost w-full mt-2"
                    onClick={() => setStep(1)}
                  >
                    Retour
                  </button>
                </>
              )}
              {status && status.success && (
                <div className="alert alert-success mt-4">{status.success}</div>
              )}
              {status && status.error && (
                <div className="alert alert-error mt-4">{status.error}</div>
              )}
              <div className="text-base-200 mt-4">
                <span>Déjà un compte ? </span>
                <button
                  type="button"
                  className="link link-secondary"
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