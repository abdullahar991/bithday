import { db } from '../../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { email, password } = await req.json()

        // Directly compare email and plain password
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE email = ? AND password_hash = ?',
            [email, password]
        )

        const user = rows[0]

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
        }

        // Return user (omit password)
        const { password_hash, ...safeUser } = user
        return NextResponse.json({ success: true, user: safeUser })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
