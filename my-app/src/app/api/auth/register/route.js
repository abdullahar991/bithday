import { db } from '../../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { name, email, password } = await req.json()
    const [rows] = await db.execute(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, password]
    )
    return NextResponse.json({ success: true, userId: rows.insertId })
}
