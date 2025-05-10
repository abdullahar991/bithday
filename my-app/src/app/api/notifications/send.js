import {db} from '../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { user_id, message, type } = await req.json()
    await db.execute('INSERT INTO notifications (user_id, message, type) VALUES (?, ?, ?)', [user_id, message, type])
    return NextResponse.json({ success: true })
}
