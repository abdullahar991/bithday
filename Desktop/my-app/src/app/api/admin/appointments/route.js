import { db } from '../../../../../lib/db';
import { NextResponse } from 'next/server';

// GET: Fetch all appointments
export async function GET() {
    console.log('GET /api/admin/appointments called');
    try {
        const [rows] = await db.execute(`
            SELECT 
                a.*, 
                u.name AS patient_name, 
                d.name AS doctor_name
            FROM appointments a
            JOIN users u ON a.user_id = u.user_id
            JOIN doctors d ON a.doctor_id = d.doctor_id
        `);

        return NextResponse.json({ success: true, appointments: rows });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
    }
}

// DELETE: Delete an appointment by ID
export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Appointment ID required' }, { status: 400 });
    }

    try {
        await db.execute('DELETE FROM appointments WHERE appointment_id = ?', [id]);
        return NextResponse.json({ success: true, message: 'Appointment deleted' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
    }
}
