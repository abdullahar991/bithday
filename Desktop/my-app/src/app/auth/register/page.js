'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../Auth.module.css'

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            if (response.ok) {
                router.push('/auth/login') // ✅ App Router navigation
            } else {
                const errorData = await response.json()
                alert(errorData.error || 'Registration failed')
            }
        } catch (error) {
            console.error('Registration error:', error)
        }
    }

    return (
        <>
            <div className={styles.authContainer}>
                <h1 className={styles.authTitle}>Create Account</h1>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
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
                            placeholder="Create a password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <button className={styles.authButton} type="submit">Register</button>
                </form>

                <p className={styles.authLink}>
                    Already have an account? <a href="/auth/login">Login</a>
                </p>
            </div>
        </>
    )
}
