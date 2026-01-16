import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter'

const auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) {
            navigate(next);
        }
    }, [auth.isAuthenticated, next]);
  return (
    <main className='bg-[url("/images/bg-auth.svg")] bg-cover min-h-screen flex items-center justify-center'>
        <div className='gradient-border shadow-lg'>
            <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                <div className='flex flex-col gap-2 items-center text-center'>
                    <h1 className='text-3xl font-bold'>Welcome Back!</h1>
                    <p className='text-gray-600'>Please sign in to your account to continue</p>
                </div>
                {isLoading ? (
                    <button className='auth-button animate-pulse' >
                        Signing you in...
                        </button>
                ) : (
                    auth.isAuthenticated ? (
                        <button className='auth-button' onClick={() => auth.signOut()}>
                            Sign Out
                        </button>
                    ) : (
                        <button className='auth-button' onClick={() => auth.signIn()}>
                            Sign In with Puter
                        </button>
                    )
                )}
            </section>
        </div>

    </main>
  )
}

export default auth