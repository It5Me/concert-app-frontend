'use client';
import { useUser } from '@/app/context/UserContext';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DecodedToken {
  exp: number;
  iat: number;
  role: string;
  sub: number;
  username: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { handleLogin } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.access_token;
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode<DecodedToken>(token);
        handleLogin(decodedToken.role, 'user', decodedToken.sub);

        router.push('/pages/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid login credentials');
      }
    } catch {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-10 rounded-lg shadow-lg max-w-lg w-full'>
        <h2 className='text-2xl font-semibold text-center mb-6 text-gray-700'>
          Login
        </h2>
        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              id='username'
              className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
