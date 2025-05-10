import {db} from '../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { user_id } = await req.json()
    const [rows] = await db.execute('SELECT * FROM appointments WHERE user_id = ?', [user_id])
    return NextResponse.json(rows)
}
