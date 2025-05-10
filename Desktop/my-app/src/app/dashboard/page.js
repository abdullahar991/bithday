'use client'
import styles from './Dashboard.module.css'

export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.dashboardTitle}>Patient Dashboard</h1>

            <div className={styles.dashboardCards}>
                <div className={styles.dashboardCard}>
                    <h2>Book Appointment</h2>
                    <p>Schedule a new appointment with a doctor</p>
                    <a href="/appointments/book" className={styles.cardButton}>Book Now</a>
                </div>

                <div className={styles.dashboardCard}>
                    <h2>Appointment History</h2>
                    <p>View your past and upcoming appointments</p>
                    <a href="/appointments/history" className={styles.cardButton}>View History</a>
                </div>

                <div className={styles.dashboardCard}>
                    <h2>Check-In</h2>
                    <p>Check-in for your upcoming appointment</p>
                    <a href="/checkin/123" className={styles.cardButton}>Check-In</a>
                </div>

                <div className={styles.dashboardCard}>
                    <h2>Notifications</h2>
                    <p>View your appointment reminders and updates</p>
                    <a href="/notifications" className={styles.cardButton}>View Notifications</a>
                </div>
            </div>
        </div>
    )
}