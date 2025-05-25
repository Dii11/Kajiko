import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Mail, Lock, Check } from 'lucide-react';

const RegisterForm = ({ isSubmitting }) => (
  <div className="w-full max-w-md p-8 space-y-4 bg-base-100 rounded shadow">
    <h2 className="text-2xl font-bold text-center">Inscription</h2>
    <div className="space-y-4">
      <div>
        <label className="label">
          <span className="label-text flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" /> Email
          </span>
        </label>
        <div className="relative">
          <Field
            type="email"
            name="email"
            className="input input-bordered w-full pl-10"
            autoComplete="username"
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-300 pointer-events-none" />
        </div>
        <ErrorMessage name="email" component="div" className="text-error text-sm" />
      </div>
      <div>
        <label className="label">
          <span className="label-text flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" /> Mot de passe
          </span>
        </label>
        <div className="relative">
          <Field
            type="password"
            name="password"
            className="input input-bordered w-full pl-10"
            autoComplete="new-password"
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-300 pointer-events-none" />
        </div>
        <ErrorMessage name="password" component="div" className="text-error text-sm" />
      </div>
      <div>
        <label className="label">
          <span className="label-text flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" /> Confirmer le mot de passe
          </span>
        </label>
        <div className="relative">
          <Field
            type="password"
            name="confirmPassword"
            className="input input-bordered w-full pl-10"
            autoComplete="new-password"
          />
          <Check className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-300 pointer-events-none" />
        </div>
        <ErrorMessage name="confirmPassword" component="div" className="text-error text-sm" />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        Créer un compte
      </button>
    </div>
  </div>
);

export default RegisterForm;