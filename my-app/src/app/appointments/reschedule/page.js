'use client'

import { Suspense } from 'react'
import Reschedule from './Reschedule'

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Reschedule />
        </Suspense>
    )
}