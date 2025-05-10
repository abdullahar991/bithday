import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <h1 className={styles.sidebarTitle}>Admin Panel</h1>
                <nav className={styles.navigation}>
                    <Link href="/admin/users" className={styles.navLink}>Users</Link>
                    <Link href="/admin/doctors" className={styles.navLink}>Doctors</Link>
                    <Link href="/admin/appointments" className={styles.navLink}>Appointments</Link>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}