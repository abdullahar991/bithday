'use client'
import styles from './Dashboard.module.css'
import Link from 'next/link'

export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.dashboardTitle}>Patient Dashboard</h1>

            <div className={styles.dashboardCards}>
                <div className={styles.dashboardCard}>
                    <h2>Book Appointment</h2>
                    <p>Schedule a new appointment with a doctor</p>
                    <Link href="/appointments/book" className={styles.cardButton}>Book Now</Link>
                </div>

                <div className={styles.dashboardCard}>
                    <h2>Appointment History</h2>
                    <p>View your past and upcoming appointments</p>
                    <Link href="/appointments/history" className={styles.cardButton}>View History</Link>
                </div>

                <div className={styles.dashboardCard}>
                    <h2>Check-In</h2>
                    <p>Check-in for your upcoming appointment</p>
                    <Link href="/checkin/123" className={styles.cardButton}>Check-In</Link>
                </div>

                <div className={styles.dashboardCard}>
                    <h2>Notifications</h2>
                    <p>View your appointment reminders and updates</p>
                    <Link href="/notifications" className={styles.cardButton}>View Notifications</Link>
                </div>
            </div>
        </div>
    )
}
