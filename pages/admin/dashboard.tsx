import React from 'react'
import Head from 'next/head'
import AdminLayout from '@/layouts/AdminLayout'

Dashboard.layout = AdminLayout

export default function Dashboard() {
    return (
        <>
        
        <Head>
            <title>Dashboard</title>
        </Head>

        <section id="dashboard-admin-page" className="container my-8 p-3">

            <h1>Dashboard Page</h1>

        </section>

        </>
    )
}
