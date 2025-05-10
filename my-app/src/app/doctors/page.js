'use client'
import { useState, useEffect } from 'react'
import styles from './Doctors.module.css'

export default function DoctorsList() {
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // In a real app, fetch from actual API
                // Using mock data for demonstration
                setDoctors([
                    {
                        doctor_id: '1',
                        name: 'Dr. John Smith',
                        specialization: 'General Medicine',
                        experience: '15 years',
                        availability: 'Mon, Wed, Fri',
                        image: 'doctor1.jpg'
                    },
                    {
                        doctor_id: '2',
                        name: 'Dr. Sarah Johnson',
                        specialization: 'Cardiology',
                        experience: '12 years',
                        availability: 'Tue, Thu',
                        image: 'doctor2.jpg'
                    },
                    {
                        doctor_id: '3',
                        name: 'Dr. Michael Williams',
                        specialization: 'Pediatrics',
                        experience: '10 years',
                        availability: 'Mon, Tue, Wed',
                        image: 'doctor3.jpg'
                    },
                    {
                        doctor_id: '4',
                        name: 'Dr. Emily Davis',
                        specialization: 'Dermatology',
                        experience: '8 years',
                        availability: 'Wed, Thu, Fri',
                        image: 'doctor4.jpg'
                    }
                ])
                setLoading(false)
            } catch (error) {
                console.error('Error fetching doctors:', error)
                setLoading(false)
            }
        }

        fetchDoctors()
    }, [])

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(filter.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(filter.toLowerCase())
    )

    if (loading) {
        return <div className={styles.loading}>Loading doctors...</div>
    }

    return (
        <div className={styles.doctorsContainer}>
            <h1 className={styles.doctorsTitle}>Our Medical Team</h1>

            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search by name or specialization"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            {filteredDoctors.length > 0 ? (
                <div className={styles.doctorsList}>
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.doctor_id} className={styles.doctorCard}>
                            <div className={styles.doctorImage}>
                                {/* In a real app, use actual images */}
                                {doctor.image ? (
                                    <div className={styles.imagePlaceholder}>
                                        {doctor.name.substring(0, 1)}
                                    </div>
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        {doctor.name.substring(0, 1)}
                                    </div>
                                )}
                            </div>
                            <div className={styles.doctorInfo}>
                                <h2 className={styles.doctorName}>{doctor.name}</h2>
                                <p className={styles.doctorSpecialty}>{doctor.specialization}</p>
                                <p className={styles.doctorExperience}>{doctor.experience} of experience</p>
                                <p className={styles.doctorAvailability}>Available: {doctor.availability}</p>
                                <a
                                    href={`/appointments/book?doctor_id=${doctor.doctor_id}`}
                                    className={styles.bookButton}
                                >
                                    Book Appointment
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.noDoctors}>No doctors found matching your search.</p>
            )}
        </div>
    )
}