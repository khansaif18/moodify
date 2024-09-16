'use client'
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthProvider';
import toast from 'react-hot-toast';
import SigninGoogleButton from './SigninGoogleButton';
import { useRouter } from 'next/navigation';
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [authenticating, setAuthenticating] = useState(false)

    const { signup, login, signInWithGoogle } = useAuth()

    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()
        if (email == '' || password == '') {
            toast.error('Fill the required fields')
            return
        }
        if (password.length < 6) {
            toast.error('Password must be 6 characters long')
            return
        }
        setAuthenticating(true)
        try {
            if (isRegister) {
                // console.log('Signing up a new user')
                await signup(email, password)
                router.push('/')
                toast.success('Signed in Successfully')
            } else {
                // console.log('Logging in existing user')
                await login(email, password)
                router.push('/')
                toast.success('Logged in Successfully')
            }

        } catch (err) {
            // console.log(err.message)
            if (err.message == 'Firebase: Error (auth/invalid-email).') toast.error('Invalid Email address')
            if (err.message == 'Firebase: Error (auth/invalid-credential).') toast.error('Invalid User Credentials')
            if (err.message == 'Firebase: Error (auth/email-already-in-use).') toast.error('This email already exists')
            else toast.error(err.message)
        } finally {
            setAuthenticating(false)
        }
    }

    return (
        <div className='flex flex-col flex-1 pt-[5rem] md:pt-[2rem] items-center gap-4 min-h-[80vh] '>
            <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>{isRegister ? 'Register' : 'Log In'}</h3>
            <p>You&#39;re one step away!</p>
            <form onSubmit={handleSubmit} className='flex flex-col w-full gap-3'>
                <input value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Email' />
                <input value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' placeholder='Password' type='password' />
                <div className='max-w-[400px] w-full mx-auto'>
                    <Button dark text={authenticating ? 'Submitting' : "Submit"} full />
                </div>
            </form>
            <p className='text-center'>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}<button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600'>{isRegister ? 'Sign in' : 'Sign up'}</button></p>
            <div className="googleAuth">
                <SigninGoogleButton handleClick={() => {
                    signInWithGoogle()
                        .then(() => router.push('/'))
                }} />
            </div>
        </div>
    )
}
