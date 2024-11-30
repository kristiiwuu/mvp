"use client"
import Header from '../components/Student-Dashboard/Header';
import Dashboard from '../components/Student-Dashboard/Dashboard';
import Head from 'next/head';

export default function StudentPortal() {

    return(
        <div className="font-orienta w-auto bg-[#F8F7F4] flex flex-col pb-12">
            <Header />
            <Dashboard />
        </div>
    );
}