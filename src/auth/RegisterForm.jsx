import React from 'react';
import { Field, ErrorMessage } from 'formik';

const RegisterForm = ({ isSubmitting }) => (
  <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded shadow">
    <h2 className="text-2xl font-bold text-center">Inscription</h2>
    <div className="space-y-4">
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
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        S'inscrire
      </button>
    </div>
  </div>
);

export default RegisterForm;