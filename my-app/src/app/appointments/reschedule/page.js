'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from '../Appointments.module.css'

export default function Reschedule() {
    const searchParams = useSearchParams()
    const appointmentId = searchParams.get('id')

    const [form, setForm] = useState({
        id: appointmentId || '',
        new_date: '',
        new_time: ''
    })

    const [appointment, setAppointment] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real app, fetch the appointment details
        setAppointment({
            id: appointmentId,
            type: 'General Checkup',
            doctor: 'Dr. Smith',
            original_date: '2025-05-10',
            original_time: '09:30'
        })
        setLoading(false)
    }, [appointmentId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/appointments/reschedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })

            if (response.ok) {
                window.location.href = '/confirmation/reschedule'
            }
        } catch (error) {
            console.error('Reschedule error:', error)
        }
    }

    if (loading) {
        return <div className={styles.loading}>Loading appointment details...</div>
    }

    if (!appointment) {
        return <div className={styles.error}>Appointment not found</div>
    }

    return (
        <div className={styles.appointmentContainer}>
            <h1 className={styles.appointmentTitle}>Reschedule Appointment</h1>

            <div className={styles.appointmentDetails}>
                <h3>Current Appointment Details</h3>
                <p><strong>Type:</strong> {appointment.type}</p>
                <p><strong>Doctor:</strong> {appointment.doctor}</p>
                <p><strong>Date:</strong> {appointment.original_date}</p>
                <p><strong>Time:</strong> {appointment.original_time}</p>
            </div>

            <form className={styles.appointmentForm} onSubmit={handleSubmit}>
                <input
                    type="hidden"
                    value={form.id}
                />

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="new_date">New Date</label>
                        <input
                            id="new_date"
                            type="date"
                            value={form.new_date}
                            onChange={e => setForm({ ...form, new_date: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="new_time">New Time</label>
                        <input
                            id="new_time"
                            type="time"
                            value={form.new_time}
                            onChange={e => setForm({ ...form, new_time: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <button className={styles.appointmentButton} type="submit">
                    Reschedule Appointment
                </button>
            </form>
        </div>
    )
}