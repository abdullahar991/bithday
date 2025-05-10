import {db} from '../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { appointment_id } = await req.json()
    await db.execute('INSERT INTO checkins (appointment_id) VALUES (?)', [appointment_id])
    await db.execute('UPDATE appointments SET status = "checked_in" WHERE appointment_id = ?', [appointment_id])
    return NextResponse.json({ success: true })
}
