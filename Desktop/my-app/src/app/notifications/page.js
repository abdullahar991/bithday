'use client'
import { useState, useEffect } from 'react'
import styles from './Notifications.module.css'

export default function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // In a real app, fetch from actual API
                // Using mock data for demonstration
                setNotifications([
                    {
                        id: '1',
                        type: 'reminder',
                        message: 'Your appointment with Dr. Smith is tomorrow at 10:30 AM',
                        date: '2025-05-01',
                        read: false
                    },
                    {
                        id: '2',
                        type: 'info',
                        message: 'Your prescription is ready for pickup',
                        date: '2025-04-28',
                        read: true
                    },
                    {
                        id: '3',
                        type: 'alert',
                        message: 'Your lab results are now available',
                        date: '2025-04-25',
                        read: false
                    },
                    {
                        id: '4',
                        type: 'confirmation',
                        message: 'Your appointment has been rescheduled to May 15, 2025 at 2:00 PM',
                        date: '2025-04-20',
                        read: true
                    }
                ])
                setLoading(false)
            } catch (error) {
                console.error('Error fetching notifications:', error)
                setLoading(false)
            }
        }

        fetchNotifications()
    }, [])

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ))
    }

    if (loading) {
        return <div className={styles.loading}>Loading notifications...</div>
    }

    return (
        <div className={styles.notificationContainer}>
            <h1 className={styles.notificationTitle}>Notifications</h1>

            {notifications.length > 0 ? (
                <div className={styles.notificationList}>
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`${styles.notificationCard} ${!notification.read ? styles.unread : ''}`}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div className={styles.notificationIcon}>
                                {notification.type === 'reminder' && '🔔'}
                                {notification.type === 'info' && 'ℹ️'}
                                {notification.type === 'alert' && '⚠️'}
                                {notification.type === 'confirmation' && '✅'}
                            </div>
                            <div className={styles.notificationContent}>
                                <p className={styles.notificationMessage}>{notification.message}</p>
                                <p className={styles.notificationDate}>{notification.date}</p>
                            </div>
                            {!notification.read && (
                                <span className={styles.unreadBadge}></span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.noNotifications}>You have no notifications.</p>
            )}
        </div>
    )
}