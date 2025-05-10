'use client';

import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDoctors: 0,
        totalAppointments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch users
                const usersResponse = await fetch('/api/admin/users');
                const users = await usersResponse.json();
                
                // Ensure the users data is valid
                const usersCount = Array.isArray(users) ? users.length : 0;

                // Fetch doctors
                const doctorsResponse = await fetch('/api/admin/doctors');
                const doctors = await doctorsResponse.json();
                
                // Ensure the doctors data is valid
                const doctorsCount = Array.isArray(doctors) ? doctors.length : 0;

                // Fetch appointments
                const appointmentsResponse = await fetch('/api/admin/appointments');
                const appointments = await appointmentsResponse.json();
                
                // Ensure the appointments data is valid
                const appointmentsCount = appointments?.appointments?.length || 0;

                setStats({
                    totalUsers: usersCount,
                    totalDoctors: doctorsCount,
                    totalAppointments: appointmentsCount
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className={styles.pageTitle}>Admin Dashboard</h1>

            {loading ? (
                <p>Loading dashboard data...</p>
            ) : (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        color="#3498db"
                    />
                    <StatCard
                        title="Total Doctors"
                        value={stats.totalDoctors}
                        color="#2ecc71"
                    />
                    <StatCard
                        title="Total Appointments"
                        value={stats.totalAppointments}
                        color="#e74c3c"
                    />
                </div>
            )}

            <div style={{ marginTop: '30px' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Quick Navigation</h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <QuickNavCard
                        title="Manage Users"
                        description="View and manage user accounts"
                        link="/admin/users"
                    />
                    <QuickNavCard
                        title="Manage Doctors"
                        description="Add, edit or remove doctors"
                        link="/admin/doctors"
                    />
                    <QuickNavCard
                        title="Manage Appointments"
                        description="View and manage appointments"
                        link="/admin/appointments"
                    />
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, color }) {
    return (
        <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minWidth: '200px',
            borderTop: `4px solid ${color}`
        }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{title}</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color }}>{value}</p>
        </div>
    );
}

function QuickNavCard({ title, description, link }) {
    return (
        <a href={link} style={{
            textDecoration: 'none',
            color: 'inherit',
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '32%',
            transition: 'transform 0.2s',
            display: 'block'
        }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{title}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{description}</p>
        </a>
    );
}
