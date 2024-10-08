'use client'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthProvider'

export default function CallToAction() {
    const { currentUser } = useAuth()

    if (currentUser) {
        let name
        if (currentUser.displayName) {
            name = currentUser?.displayName.split(' ')[0]
        }
        else {
            name = currentUser?.auth?.currentUser?.email.split('@')[0].slice(0, 10);
        }

        return (
            <div className='max-w-[600px] mx-auto w-full flex items-center justify-center gap-3'>
                <Button small disable={true} text={`Hello, ${name.toUpperCase()}`} />
                <Link href={'/dashboard'}>
                    <Button dark full text="Go to dashboard" />
                </Link>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
            <Link href={'/dashboard'}>
                <Button text="Sign Up" />
            </Link>
            <Link href={'/dashboard'}>
                <Button text="Login" dark />
            </Link>
        </div>
    )
}
