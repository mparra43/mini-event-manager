'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form } from '@transversal/components/Form';
import { registerSchema } from '@schemas/register.schema';
import { register } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import type { RegisterSchemaType } from '@schemas/register.schema';

export default function RegisterPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: RegisterSchemaType) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await register(data);
      authLogin(result);
      router.push('/events');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      label: 'Nombre',
      name: 'name',
      placeholder: 'Tu nombre',
      type: 'text' as const,
      inputType: 'text' as const,
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'tu@email.com',
      type: 'email' as const,
      inputType: 'text' as const,
    },
    {
      label: 'Contraseña',
      name: 'password',
      placeholder: '••••••••',
      type: 'password' as const,
      inputType: 'text' as const,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl border border-emerald-100">
        <h1 className="text-3xl font-semibold mb-6 text-center text-emerald-800">
          Registrarse
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <Form
          schema={registerSchema}
          fields={fields}
          buttonProps={{
            label: isLoading ? 'Registrando...' : 'Registrarse',
            type: 'submit',
            variant: 'primary',
            disabled: isLoading,
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
