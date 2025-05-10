import {db} from '../../../../lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const [rows] = await db.execute('SELECT * FROM doctors WHERE available = 1')
    return NextResponse.json(rows)
}
