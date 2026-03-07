'use client'

import Link from 'next/link'

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between p-6">
            <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <nav className="flex flex-col gap-4">

                    <Link href="/dashboard" className="bg-purple-500 text-white px-4 py-2 rounded-lg">
                        Home
                    </Link>
                    <Link href="/dashboard/overview" className="text-gray-600">
                        Overview
                    </Link>
                    <Link href="/dashboard/demographics" className="text-gray-600">
                    Demographics
                    </Link>
                    <Link href="/dashboard/preference" className="text-gray-600">
                        Preference
                    </Link>
                    <Link href="/dashboard/participation" className="text-gray-600">
                        Participation
                    </Link>
                    <Link href="/dashboard/engagement" className="text-gray-600">
                        Engagement
                    </Link>
                    <Link href="/dashboard/delivery" className="text-gray-600">
                        Delivery
                    </Link>
                </nav>
            </div>
        </aside>
    )
}