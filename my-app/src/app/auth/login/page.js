'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../Auth.module.css'
import Link from 'next/link'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()

        // Check if email and password are both 'admin'
        if (form.email === 'admin' && form.password === 'admin') {
            router.push('/admin')  // Redirect to admin dashboard
            return
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            if (response.ok) {
                router.push('/dashboard') // ✅ App Router navigation
            } else {
                const errorData = await response.json()
                alert(errorData.error || 'Login failed')
            }
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <>
            <div className={styles.authContainer}>
                <h1 className={styles.authTitle}>Login</h1>
                <form className={styles.authForm} onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <button className={styles.authButton} type="submit">Login</button>
                </form>

                <p className={styles.authLink}>
                    Don&apos;t have an account? <Link href="/auth/register">Register</Link>
                </p>
            </div>
        </>
    )
}
