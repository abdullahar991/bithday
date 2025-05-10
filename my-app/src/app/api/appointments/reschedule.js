import {db} from '../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { appointment_id, new_date, new_time } = await req.json()
    const [[old]] = await db.execute('SELECT appointment_date, appointment_time FROM appointments WHERE appointment_id = ?', [appointment_id])

    await db.execute('UPDATE appointments SET appointment_date = ?, appointment_time = ?, status = "rescheduled" WHERE appointment_id = ?',
        [new_date, new_time, appointment_id]
    )

    await db.execute('INSERT INTO reschedules (appointment_id, old_date, old_time, new_date, new_time) VALUES (?, ?, ?, ?, ?)',
        [appointment_id, old.appointment_date, old.appointment_time, new_date, new_time]
    )

    return NextResponse.json({ success: true })
}
