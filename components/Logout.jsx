'use client'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthProvider'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function Logout() {
    const { logout, currentUser } = useAuth()
    const pathname = usePathname()
    const router = useRouter()

    if (!currentUser) {
        return null
    }

    if (pathname === '/') {
        return (
            <Link href={'/dashboard'}>
                <Button text="Go to dashboard" dark />
            </Link>
        )
    }

    return (
        <Button text='Logout' clickHandler={() => {
            logout().then(() => {
                router.push('/')
                toast.success('Logged out Successfully!')
            })
        }} />
    )
}
