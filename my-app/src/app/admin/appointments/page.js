'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('/api/admin/appointments');
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();
            setAppointments(data.appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAppointment = async (id) => {
        if (!confirm('Are you sure you want to delete this appointment?')) return;

        try {
            const response = await fetch(`/api/admin/appointments?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete appointment');

            // Refresh appointments list
            fetchAppointments();
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const formatDateTime = (date, time) => {
        return `${date} at ${time}`;
    };

    return (
        <div>
            <h1 className={styles.pageTitle}>Manage Appointments</h1>

            {loading ? (
                <p>Loading appointments...</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Type</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.appointment_id}>
                                <td>{appointment.appointment_id}</td>
                                <td>{appointment.patient_name}</td>
                                <td>{appointment.doctor_name}</td>
                                <td>{appointment.appointment_type}</td>
                                <td>{formatDateTime(appointment.appointment_date, appointment.appointment_time)}</td>
                                <td>{appointment.location}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={() => handleDeleteAppointment(appointment.appointment_id)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
