'use client'
import { useState, useEffect } from 'react'
import styles from './Checkin.module.css'

export default function Checkin({ params }) {
    const [loading, setLoading] = useState(false)
    const [checkedIn, setCheckedIn] = useState(false)
    const [appointment, setAppointment] = useState(null)

    useEffect(() => {
        // In a real app, fetch appointment details
        setAppointment({
            id: params.id,
            type: 'General Checkup',
            doctor: 'Dr. Smith',
            date: '2025-05-02',
            time: '10:30',
            location: 'Main Clinic, Room 205'
        })
    }, [params.id])

    const handleCheckin = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/appointments/checkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: params.id })
            })

            if (response.ok) {
                setCheckedIn(true)
            }
        } catch (error) {
            console.error('Check-in error:', error)
        } finally {
            setLoading(false)
        }
    }

    if (!appointment) {
        return <div className={styles.loading}>Loading appointment details...</div>
    }

    return (
        <div className={styles.checkinContainer}>
            <h1 className={styles.checkinTitle}>Appointment Check-In</h1>

            {!checkedIn ? (
                <>
                    <div className={styles.appointmentDetails}>
                        <h2>Your Appointment Details</h2>
                        <div className={styles.detailsCard}>
                            <p><strong>Doctor:</strong> {appointment.doctor}</p>
                            <p><strong>Type:</strong> {appointment.type}</p>
                            <p><strong>Date:</strong> {appointment.date}</p>
                            <p><strong>Time:</strong> {appointment.time}</p>
                            <p><strong>Location:</strong> {appointment.location}</p>
                        </div>
                    </div>

                    <button
                        className={styles.checkinButton}
                        onClick={handleCheckin}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Check In Now'}
                    </button>

                    <p className={styles.checkinNote}>
                        Please check in when you arrive at the clinic
                    </p>
                </>
            ) : (
                <div className={styles.checkinSuccess}>
                    <div className={styles.successIcon}>✓</div>
                    <h2>Check-In Successful!</h2>
                    <p>You have successfully checked in for your appointment.</p>
                    <p>Please have a seat in the waiting area. A staff member will call you when the doctor is ready.</p>
                    <a href="/dashboard" className={styles.backButton}>Back to Dashboard</a>
                </div>
            )}
        </div>
    )
}