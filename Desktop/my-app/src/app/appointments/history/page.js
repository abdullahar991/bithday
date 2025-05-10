'use client'
import { useState, useEffect } from 'react'
import styles from '../Appointments.module.css'

export default function AppointmentHistory() {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // In a real app, fetch from actual API
                // For demo, using mock data
                setAppointments([
                    {
                        id: '1', appointment_date: '2025-05-10', time: '09:30',
                        doctor: 'Dr. Smith', type: 'General Checkup', status: 'Upcoming'
                    },
                    {
                        id: '2', appointment_date: '2025-04-25', time: '14:00',
                        doctor: 'Dr. Johnson', type: 'Consultation', status: 'Completed'
                    },
                    {
                        id: '3', appointment_date: '2025-04-15', time: '11:15',
                        doctor: 'Dr. Williams', type: 'Follow-up', status: 'Completed'
                    }
                ])
                setLoading(false)
            } catch (error) {
                console.error('Error fetching appointments:', error)
                setLoading(false)
            }
        }

        fetchAppointments()
    }, [])

    if (loading) {
        return <div className={styles.loading}>Loading appointments...</div>
    }

    return (
        <div className={styles.appointmentContainer}>
            <h1 className={styles.appointmentTitle}>Appointment History</h1>

            {appointments.length > 0 ? (
                <div className={styles.appointmentList}>
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className={`${styles.appointmentCard} ${appointment.status === 'Upcoming' ? styles.upcoming :
                                    appointment.status === 'Completed' ? styles.completed : ''
                                }`}
                        >
                            <div className={styles.appointmentHeader}>
                                <h3>{appointment.type}</h3>
                                <span className={styles.appointmentStatus}>{appointment.status}</span>
                            </div>
                            <div className={styles.appointmentDetails}>
                                <p><strong>Date:</strong> {appointment.appointment_date}</p>
                                <p><strong>Time:</strong> {appointment.time}</p>
                                <p><strong>Doctor:</strong> {appointment.doctor}</p>
                            </div>
                            {appointment.status === 'Upcoming' && (
                                <div className={styles.appointmentActions}>
                                    <a
                                        href={`/appointments/reschedule?id=${appointment.id}`}
                                        className={styles.rescheduleButton}
                                    >
                                        Reschedule
                                    </a>
                                    <button className={styles.cancelButton}>Cancel</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.noAppointments}>You have no appointments.</p>
            )}
        </div>
    )
}